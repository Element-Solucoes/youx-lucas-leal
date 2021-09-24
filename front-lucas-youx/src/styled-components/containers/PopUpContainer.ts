import styled from 'styled-components';

// O container dos pop ups.

export const PopUpContainer = styled.div`
  background-color: white;
  padding: 1.5em;
  border-radius: 20px;
  box-shadow: 0px 5px 10px #00000036;

  & > h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  & > p:last-child {
    margin-top: 2em;
  }
`;
