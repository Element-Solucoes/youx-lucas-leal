// Essa interface é usada para converter a resposta do backend.
export interface Patient {
  nome: string;
  cpf: string;
  hash_cpf: string;
  nascimento: string;
  peso: number;
  altura: number;
  uf: string;
  sequencia: number;
}
