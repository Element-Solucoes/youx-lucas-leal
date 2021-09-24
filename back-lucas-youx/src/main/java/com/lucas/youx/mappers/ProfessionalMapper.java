package com.lucas.youx.mappers;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.lucas.youx.classes.Professional;

// Mapeia linhas de SQL para um objeto de profissional.

public class ProfessionalMapper implements RowMapper<Professional> {
  @Override
  public Professional mapRow(ResultSet rs, int rowNum) throws SQLException {

      Professional profissional = new Professional(
        rs.getString("tx_nome"), 
        rs.getString("tx_email"), 
        rs.getString("hs_cpf"), 
        rs.getString("hs_senha"), 
        rs.getString("tx_tipo"), 
        rs.getInt("nm_sequencia")
      );
      return profissional;

  }
}
