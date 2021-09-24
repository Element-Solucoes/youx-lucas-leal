import { NavbarButtonProps } from '../interfaces/NavbarButtonProps';
import { NavbarIcon } from '../styled-components/images/NavbarIcon';
import firebase from 'firebase/app';

export const NavbarButton: React.FC<NavbarButtonProps> = (props: NavbarButtonProps) => {
  // Botãozinho de logout.
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <NavbarIcon onClick={props.className === 'nav_exit' ? logout : props.callback} className={props.className}>
      {props.text}
    </NavbarIcon>
  );
};
