import styled from 'styled-components';

// O wrapper da tela de login (container mais de fora)

export const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20000;
  display: flex;
  justify-content: center;
  place-content: center;
  place-items: center;
  background-image: linear-gradient(45deg, #4b2e73, #481292);
`;
