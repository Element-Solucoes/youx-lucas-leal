export interface NavbarProps {
  active: 'PACIENTES' | 'FUNCIONÁRIOS';
  account: 'ENFERMEIRO' | 'MÉDICO';
  callbackSetPacientes: () => void;
  callbackSetFuncionarios: () => void;
}
