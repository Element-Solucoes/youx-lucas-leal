package com.lucas.youx;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;

public class PatientRegister {

  // Recebe os dados de uma requisição HTTP e retorna um objeto com falha ou sucesso.
  public static ResponseEntity<String> ParsePatientRegistry(Map<String,Object> body, JdbcTemplate jdbcTemplate) {
    // Checa os requisitos obrigatórios.
    if (!body.containsKey("nome")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o nome do paciente."); }
    if (!body.containsKey("cpf")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o CPF do paciente."); }
    if (!body.containsKey("uf")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o UF do paciente."); }

    // Checa se os requisitos obrigatórios são válidos.
    if (body.get("nome").toString().isEmpty()) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o nome do paciente."); }
    if (body.get("cpf").toString().isEmpty()) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o CPF do paciente."); }
    if (body.get("uf").toString().isEmpty()) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o UF do paciente."); }

    // Encripta o CPF antes da checagem.
    String encrypted = Encrypt.encrypt(body.get("cpf").toString());
    String unique_cpf_query = "SELECT COUNT(nm_sequencia) FROM PACIENTES WHERE hs_cpf='" + encrypted + "'";

    // Checa os registros no banco de dados por duplicidade.
    int unique_cpf_result = jdbcTemplate.queryForObject(unique_cpf_query, Integer.class);
    if (unique_cpf_result > 0) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Este CPF já existe no banco de dados."); }

    // Guarda os dados para a query do banco final.
    Map<String, String> string_params = new HashMap<String, String>();
    Map<String, Float> float_params = new HashMap<String, Float>();

    string_params.put("nome", body.get("nome").toString());
    string_params.put("cpf", encrypted);
    string_params.put("uf", body.get("uf").toString());
    
    if (body.containsKey("nascimento")) {
      string_params.put("nascimento", body.get("nascimento").toString());
    }

    if (body.containsKey("peso")) {
      if (isValidFloat(body.get("peso").toString())) { float_params.put("peso", Float.parseFloat(body.get("peso").toString())); }
    }

    if (body.containsKey("altura")) {
      if (isValidFloat(body.get("altura").toString())) { float_params.put("altura", Float.parseFloat(body.get("altura").toString())); }
    }

    // Popula os parâmetros opcionais no caso de não serem enviados.
    if (!string_params.containsKey("nascimento")) {string_params.put("nascimento", "00/00/0000"); }
    if (!float_params.containsKey("peso")) {float_params.put("peso", 0f); }
    if (!float_params.containsKey("altura")) {float_params.put("altura", 0f); }

    // Grava os dados no banco de dados.
    String record_sql = "INSERT INTO PACIENTES(tx_nome, hs_cpf, dt_nascimento, nm_peso, nm_altura, tx_uf) VALUES (?, ?, ?, ?, ?, ?)";
    int rows_affected = jdbcTemplate.update(record_sql, string_params.get("nome"), string_params.get("cpf"), string_params.get("nascimento"), float_params.get("peso"), float_params.get("altura"), string_params.get("uf"));

    if (rows_affected == 0) { return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Não foi possível salvar o paciente no banco de dados."); }

    return ResponseEntity.status(HttpStatus.ACCEPTED).body("Sucesso.");
  }

  // Checa se uma string pode ser convertida para float.
  private static boolean isValidFloat(String inFloat) {
    try{
      Float.parseFloat(inFloat);
    }catch(NumberFormatException e){
      return false;
    }
    return true;
  }
}
