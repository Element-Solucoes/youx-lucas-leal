package com.lucas.youx;

import java.util.Map;

import com.google.gson.Gson;
import com.lucas.youx.classes.Account;
import com.lucas.youx.mappers.AccountMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;

public class AccountTypeLoader {
    // Recebe os dados de uma requisição HTTP e retorna um objeto com falha ou sucesso.
    public static ResponseEntity<String> ParseAccountType(Map<String,Object> body, JdbcTemplate jdbcTemplate) {
      // Checa as variáveis essenciais.
      if (!body.containsKey("email")) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você precisa enviar o e-mail da conta."); }

      try {

        // Monta a query SQL.
        String sql = "SELECT tx_tipo FROM PROFISSIONAIS WHERE tx_email='" + body.get("email") + "'";
        Account result = jdbcTemplate.queryForObject(sql, new AccountMapper());

        // Converte para JSON.
        String json = new Gson().toJson(result);

        // Retorna a requisição.
        return ResponseEntity.status(HttpStatus.OK).body(json);

      } catch (Exception e) {

        System.out.println(e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao buscar o tipo de conta.");
        
      }
    }
  
}
