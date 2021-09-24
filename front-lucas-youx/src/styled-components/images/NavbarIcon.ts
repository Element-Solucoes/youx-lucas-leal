import styled from 'styled-components';

// O container para os ícones da navbar.

export const NavbarIcon = styled.div`
  height: 90%;
  margin-right: 1em;
  padding: 0.2em 0.7em 0.2em 0.5em;
  display: flex;
  justify-content: center;
  place-content: center;
  place-items: center;
  box-shadow: 0px 2px 5px #1806252e;
  border-bottom: 1px solid #9707ff5c;
  color: #424242;
  border-radius: 10px;
  transition: all 0.2s ${(props) => props.theme.functions.default_curve};

  &:hover {
    cursor: pointer;
    background-color: #ebceff;
  }

  & > img {
    height: 1.5em;
    vertical-align: middle;
    margin-right: 0.5em;
  }
`;
