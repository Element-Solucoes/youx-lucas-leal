package com.lucas.youx;

import java.util.List;

import com.google.gson.Gson;
import com.lucas.youx.classes.Patient;
import com.lucas.youx.mappers.PatientMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;

public class PatientRetriever {
    // Recebe os dados de uma requisição HTTP e retorna um objeto com falha ou sucesso.
    public static ResponseEntity<String> ParsePatientRecords(JdbcTemplate jdbcTemplate) {
      try {

        // Monta a query SQL.
        String sql = "SELECT * FROM PACIENTES ORDER BY tx_nome";
        List<Patient> patients = jdbcTemplate.query(sql, new PatientMapper());

        // Converte para JSON.
        String json = new Gson().toJson(patients);

        // Retorna a requisição.
        return ResponseEntity.status(HttpStatus.OK).body(json);

      } catch (Exception e) {

        System.out.println(e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao buscar os pacientes.");

      }
    }
  
}
