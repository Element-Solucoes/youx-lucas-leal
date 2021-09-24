import styled from 'styled-components';

// Esse container engloba todos os components da navbar.

export const NavbarContainer = styled.nav`
  display: -webkit-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  align-content: center;

  & > div {
    display: flex;
  }
`;
