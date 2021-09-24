import styled from 'styled-components';

// A parte de fora dos pop ups (container mais ao fundo)

export const PopUpWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  place-content: center;
  place-items: center;
  z-index: 10000;
  backdrop-filter: blur(3px) brightness(0.7);
`;
