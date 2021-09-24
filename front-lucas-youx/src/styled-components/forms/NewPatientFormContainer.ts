import styled from 'styled-components';

// Container para o formulário de adição de pacientes.

export const NewPatientFormContainer = styled.form`
  display: flex;
  flex-direction: column;

  & > input {
    font-size: 1em;
    margin: 0.2em 0;
    padding: 0.5em 0.9em;
    border-radius: 20px;
    background-color: #150123;
    color: white;
    border: 0;
  }
`;
