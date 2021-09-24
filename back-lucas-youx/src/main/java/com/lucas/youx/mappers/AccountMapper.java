package com.lucas.youx.mappers;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.lucas.youx.classes.Account;


public class AccountMapper implements RowMapper<Account> {
  @Override
  public Account mapRow(ResultSet rs, int rowNum) throws SQLException {

    Account account = new Account(
        rs.getString("tx_tipo")
      );
      return account;
  }
}
