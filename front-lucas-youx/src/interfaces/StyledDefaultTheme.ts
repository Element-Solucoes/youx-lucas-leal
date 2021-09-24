import 'styled-components';

//  Essa interface basicamente estende o comportamento padrão do tema default no
//  styled-components, adicionando mais opções ao mesmo.

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text_color: string;
      background_color: string;
    };
    functions: {
      default_curve: string;
    };
    fonts: {
      default: string;
      titles: string;
    };
  }
}
