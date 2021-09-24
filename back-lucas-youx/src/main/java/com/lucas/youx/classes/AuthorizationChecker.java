package com.lucas.youx.classes;

public class AuthorizationChecker {
  // Checa pelos headers de autorização das requisições.
  // Por questões de tempo, usaremos uma autorização hard-coded.
  // Entretanto, em uma situação real, criaríamos uma autenticação para cada
  // domínio permitido.
  private static String key = "AUTH-LUCAS-YOUX-1008";

  public static boolean CheckAuth(String auth) {
    return key.equals(auth);
  }
}