package com.lucas.youx;

import java.util.HashMap;
import java.util.Map;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.lucas.youx.classes.Account;
import com.lucas.youx.mappers.AccountMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;

public class ProfessionalRegister {

  // Recebe os dados de uma requisição HTTP e retorna um objeto com falha ou sucesso.
  public static ResponseEntity<String> ParseProfessionalRegistry(Map<String,Object> body, JdbcTemplate jdbcTemplate, FirebaseApp firebase) throws FirebaseAuthException {

    // Checa os privilégios.
    if (!body.containsKey("email_atual")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o e-mail atual da sua conta."); }
    if (body.get("email_atual").toString().isEmpty()) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o e-mail atual da sua conta."); }
    try {
      String sql_check = "SELECT tx_tipo FROM PROFISSIONAIS WHERE tx_email='" + body.get("email_atual") + "'";
      Account result = jdbcTemplate.queryForObject(sql_check, new AccountMapper());

      if (!result.tipo.equals("MEDICO")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você não tem permissão para acessar este conteúdo."); }
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao buscar os profissionais.");
    }

    // Checa os requisitos obrigatórios.
    if (!body.containsKey("nome")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o nome do profissional."); }
    if (!body.containsKey("cpf")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o CPF do profissional."); }
    if (!body.containsKey("email")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o email do profissional."); }
    if (!body.containsKey("password")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar a senha do profissional."); }
    if (!body.containsKey("password_confirm")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar a senha do profissional."); }
    if (!body.containsKey("cargo")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o cargo do profissional."); }

    // Checa se os requisitos obrigatórios são válidos.
    if (body.get("nome").toString().isEmpty()) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o nome do profissional."); }
    if (body.get("cpf").toString().isEmpty()) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o CPF do profissional."); }
    if (body.get("email").toString().isEmpty()) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o email do profissional."); }
    if (body.get("password").toString().isEmpty()) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar a senha do profissional."); }
    if (body.get("password_confirm").toString().isEmpty()) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar a senha do profissional."); }
    if (!body.get("cargo").toString().equals("MEDICO") &&  !body.get("cargo").toString().equals("ENFERMEIRO")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o cargo do profissional."); }

    // Checa pela conformidade entre as duas senhas enviadas.
    String encrypted_password = Encrypt.encrypt(body.get("password").toString());
    String encrypted_password_2 = Encrypt.encrypt(body.get("password_confirm").toString());
    if (!encrypted_password.equals(encrypted_password_2)) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("As senhas não são iguais."); }

    // Encripta o CPF antes da checagem.
    String encrypted_cpf = Encrypt.encrypt(body.get("cpf").toString());

    // Checa os registros no banco de dados por duplicidade.
    String unique_cpf_query = "SELECT COUNT(nm_sequencia) FROM PROFISSIONAIS WHERE hs_cpf='" + encrypted_cpf + "'";
    int unique_cpf_result = jdbcTemplate.queryForObject(unique_cpf_query, Integer.class);
    if (unique_cpf_result > 0) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Este CPF já existe no banco de dados."); }

    // Guarda os dados para a query do banco final.
    Map<String, String> string_params = new HashMap<String, String>();

    string_params.put("nome", body.get("nome").toString());
    string_params.put("cpf", encrypted_cpf);
    string_params.put("password", encrypted_password);
    string_params.put("email", body.get("email").toString());
    string_params.put("cargo", body.get("cargo").toString());

    // Cria uma request de novo usuário no firebase.
    UserRecord.CreateRequest request = new UserRecord.CreateRequest()
    .setEmail(string_params.get("email"))
    .setEmailVerified(false)
    .setPassword(body.get("password").toString())
    .setDisplayName(string_params.get("nome"))
    .setDisabled(false);

    // Tenta criar um novo usuário.
    try {
      FirebaseAuth.getInstance(firebase).createUser(request);
    } catch (FirebaseAuthException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    // Grava os dados no banco de dados.
    String record_sql = "INSERT INTO PROFISSIONAIS(tx_nome, hs_cpf, tx_email, tx_tipo, hs_senha) VALUES (?, ?, ?, ?, ?)";
    int rows_affected = jdbcTemplate.update(record_sql, string_params.get("nome"), string_params.get("cpf"), string_params.get("email"), string_params.get("cargo"), string_params.get("password"));
    if (rows_affected == 0) { return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Não foi possível salvar o profissional no banco de dados."); }

    return ResponseEntity.status(HttpStatus.ACCEPTED).body("Sucesso.");
  }
}
