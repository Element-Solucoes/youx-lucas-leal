package com.lucas.youx;

import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.lucas.youx.classes.Account;
import com.lucas.youx.classes.Professional;
import com.lucas.youx.mappers.AccountMapper;
import com.lucas.youx.mappers.ProfessionalMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;

public class ProfessionalRetriever {
      // Recebe os dados de uma requisição HTTP e retorna um objeto com falha ou sucesso.
      public static ResponseEntity<String> ParseProfessionalRecords(Map<String,Object> body, JdbcTemplate jdbcTemplate) {
        try {
          // Checa os privilégios da conta enviada.
          if (!body.containsKey("email")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o e-mail da sua conta."); }
          String sql_check = "SELECT tx_tipo FROM PROFISSIONAIS WHERE tx_email='" + body.get("email") + "'";
          Account result = jdbcTemplate.queryForObject(sql_check, new AccountMapper());

          if (!result.tipo.equals("MEDICO")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você não tem permissão para acessar este conteúdo."); }

          // Monta a query SQL.
          String sql = "SELECT * FROM PROFISSIONAIS ORDER BY tx_nome";
          List<Professional> professionals = jdbcTemplate.query(sql, new ProfessionalMapper());
          // Converte para JSON.
          String json = new Gson().toJson(professionals);
          // Retorna a requisição.
          return ResponseEntity.status(HttpStatus.OK).body(json);
        } catch (Exception e) {
          System.out.println(e.getMessage());
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao buscar os profissionais.");
        }
      }
}
