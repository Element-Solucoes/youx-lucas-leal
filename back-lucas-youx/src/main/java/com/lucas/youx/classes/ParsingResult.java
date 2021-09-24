package com.lucas.youx.classes;

import org.springframework.http.HttpStatus;

// Esta classe é responsável por dizer se a ação de parsing dos dados de uma requisição
// foi bem sucedida ou não.
// Seria totalmente possível fazer isso com variáveis primitivas, mas, para manter a
// legibilidade do código, utilizaremos uma classe separada.

public class ParsingResult {
  public boolean success;
  public String errorMessage;
  public HttpStatus errorStatus;

  public ParsingResult(boolean _success, String _errorMessage, HttpStatus _error) {
    success = _success;
    errorMessage = _errorMessage;
    errorStatus = _error;
  }
}
