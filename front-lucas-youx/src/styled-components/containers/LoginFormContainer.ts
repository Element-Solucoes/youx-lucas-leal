import styled from 'styled-components';

// Segura todo mundo junto no formulário de login.

export const LoginFormContainer = styled.div`
  background-color: white;
  padding: 1em;
  border-radius: 20px;
  box-shadow: 5px 3px 8px #0000005c;

  & > h1 {
    text-align: center;
    font-size: 2em;
  }

  & > form {
    display: flex;
    flex-direction: column;

    & > input {
      margin: 0.5em 0;
      font-size: 1em;
      padding: 0.5em;
      border: 0;
      border-radius: 20px;
      background-color: white;
      border: 1px solid #4b2e73;
      transition: all 0.2s ${(props) => props.theme.functions.default_curve};

      &:hover {
        cursor: text;
        background-color: #dcc1ff;
      }
    }
  }
`;
