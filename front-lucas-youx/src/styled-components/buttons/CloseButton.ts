import styled from 'styled-components';
import { DefaultButton } from './DefaultButton';

// Um botão para fechamento de interfaces.

export const CloseButton = styled(DefaultButton)`
  background-color: #b33131;

  &:hover {
    background-color: #fb0d0d;
  }
`;
