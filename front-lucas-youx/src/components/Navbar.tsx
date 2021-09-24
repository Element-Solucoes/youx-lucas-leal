import { NavbarProps } from '../interfaces/NavbarProps';
import { NavbarContainer } from '../styled-components/containers/NavbarContainer';
import { NavbarButton } from './NavbarButton';

export function Navbar(props: NavbarProps): JSX.Element {
  // Monta uma navbar personalizada.
  // No caso de um usuário enfermeiro, mostramos apenas o botão de pacientes.
  return (
    <NavbarContainer>
      <div>
        <NavbarButton
          callback={props.callbackSetPacientes}
          className={props.active == 'PACIENTES' ? 'navbar_active' : ''}
          text="😷 Pacientes"
        />
        {props.account == 'MÉDICO' ? (
          <NavbarButton
            callback={props.callbackSetFuncionarios}
            className={props.active == 'FUNCIONÁRIOS' ? 'navbar_active' : ''}
            text="🩺 Funcionários"
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        <NavbarButton
          callback={() => {
            return null;
          }}
          className={'nav_exit'}
          text="❌ Sair"
        />
      </div>
    </NavbarContainer>
  );
}
