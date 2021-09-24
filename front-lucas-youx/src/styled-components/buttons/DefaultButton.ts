import styled from 'styled-components';

// Um botão default.

export const DefaultButton = styled.button`
  border: 0;
  background-color: #4b2e73;
  font-size: 1em;
  color: white;
  padding: 0.4em 1.5em;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 2em;
  transition: all 0.2s ${(props) => props.theme.functions.default_curve};

  &:hover {
    cursor: pointer;
    background-color: #6b00ff;
  }
`;
