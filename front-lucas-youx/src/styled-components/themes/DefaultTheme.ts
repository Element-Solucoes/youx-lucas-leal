import { DefaultTheme } from 'styled-components';

/*
  Um tema padrão customizável para o styled-components.
  Mudar os valores aqui alteraria todo o visual da página!
  A implementação da interface se encontra em src/interfaces/StyledDefaultTheme.ts
*/

export const Default: DefaultTheme = {
  colors: {
    // Textos.
    text_color: '#1e1e1e',
    // Backgrounds.
    background_color: 'linear-gradient(45deg, #12011d, #1a0727);',
  },
  functions: {
    // Funções de animação.
    default_curve: 'cubic-bezier(.42,0,.58,1)',
  },
  fonts: {
    // Declaração de fontes.
    default: 'Cabin, sans-serif',
    titles: 'Staatliches, cursive',
  },
};
