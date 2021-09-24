package com.lucas.youx.classes;

import com.lucas.youx.Encrypt;

// A classe base para guardar informações de um paciente.

public class Patient {
  public String nome;
  public String cpf;
  public String hash_cpf;
  public String nascimento;
  public float peso;
  public float altura;
  public String uf;
  public int sequencia;

  public Patient(String _nome, String _hash_cpf, String _nascimento, float _peso, float _altura, String _uf, int _sequencia) {
    nome = _nome; 
    hash_cpf = _hash_cpf;
    cpf = Encrypt.decrypt(_hash_cpf);
    nascimento = _nascimento;
    peso = _peso;
    altura = _altura;
    uf = _uf;
    sequencia = _sequencia;
  }
}
