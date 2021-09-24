package com.lucas.youx.classes;

import com.lucas.youx.Encrypt;

// Nesta classe guardaremos todas as informações de um dado profissional.

public class Professional {
  public String nome;
  public String email;
  public String cpf;
  public String hash_cpf;
  public String senha;
  public String hash_senha;
  public String tipo;
  public int sequencia;

  public Professional(String _nome, String _email, String _hash_cpf, String _hash_senha, String _tipo, int _sequencia) {
    nome = _nome; 
    email = _email;
    cpf = Encrypt.decrypt(_hash_cpf);
    hash_cpf = _hash_cpf;
    senha = Encrypt.decrypt(_hash_senha);
    hash_senha = _hash_senha;
    tipo = _tipo;
    sequencia = _sequencia;
  }
}
