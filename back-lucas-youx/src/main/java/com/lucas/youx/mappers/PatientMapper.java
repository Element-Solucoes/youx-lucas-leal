package com.lucas.youx.mappers;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.lucas.youx.classes.Patient;

// Mapeia linhas de SQL para um objeto de paciente.

public class PatientMapper implements RowMapper<Patient> {
  @Override
  public Patient mapRow(ResultSet rs, int rowNum) throws SQLException {

      Patient patient = new Patient(
        rs.getString("tx_nome"), 
        rs.getString("hs_cpf"), 
        rs.getString("dt_nascimento"), 
        rs.getFloat("nm_peso"), 
        rs.getFloat("nm_altura"), 
        rs.getString("tx_uf"),
        rs.getInt("nm_sequencia")
      );
      return patient;

  }
}
