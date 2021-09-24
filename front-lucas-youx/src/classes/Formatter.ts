export class Formatter {
  // Formata uma string para o formato de CPF.
  // Não checa sua validade.
  public FormatCPF(input: string): string {
    return `${input.substr(0, 3)}.${input.substr(3, 3)}.${input.substr(6, 3)}-${input.substr(9, 2)}`;
  }

  // Formata uma string para o formato de altura.
  // Não checa sua validade.
  public FormatHeight(input: string): string {
    return `${input} m`;
  }

  // Formata uma string para o formato de peso.
  // Não checa sua validade.
  public FormatWeight(input: string): string {
    return `${input} kg`;
  }

  // Formata o retorno do Input Masker para o formato de data aceito pelo sistema.
  // Não checa sua validade.
  public FormatDate(input: string): string {
    return `${input.substr(8, 2)}/${input.substr(5, 2)}/${input.substr(0, 4)}`;
  }
}
