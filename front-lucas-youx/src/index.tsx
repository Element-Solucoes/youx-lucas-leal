import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

/*
  Sejam bem vindxs ao código da minha entrada no processo seletivo da YouX! :D
  No front-end, eu decidi utilizar o React por ser uma framework que eu possuo mais conhecimento e conforto em usar.
  É importante salientar que, mesmo que este aplicativo esteja usando a implementação do Typescript (arquivos 'tsx'),
  não haveria problema em desenvolvê-la em javascript puro.

  Outros pontos importantes:
  - Para maior facilidade, e cumprimento de prazos, o design é comandado pelo styled-components (https://styled-components.com).
  - O sistema usa o Firebase do Google para lidar com logins, portanto, para permitir que o pessoal da YouX consiga avaliar o código,
  o domínio localhost foi permitido nas configurações do projeto. Mas em uma versão de produção, isso seria evitado.
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
