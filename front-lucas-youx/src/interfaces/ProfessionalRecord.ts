// Essa interface é usada para converter a resposta do backend.
export interface Professional {
  nome: string;
  email: string;
  cpf: string;
  hash_cpf: string;
  senha: string;
  hash_senha: string;
  tipo: string;
  sequencia: number;
}
