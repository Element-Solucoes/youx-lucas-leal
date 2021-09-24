import { createGlobalStyle } from 'styled-components';

// Esse é um arquivo de estilo global, ele será aplicado em TODOS os componentes da página.

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${(props) => props.theme.fonts.default};
    font-weight: normal;
  }

  *:disabled {
    opacity: 0.5 !important;
    background-color: gray !important;
    pointer-events: none !important;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  .disabled {
    opacity: 0.5 !important;
    background-color: gray !important;
    pointer-events: none !important;
  }

  .navbar_active {
    background-color: #c9aafb;
  }

  .nav_exit {
    background-color: #ffdada;
    &:hover {
      background-color: #ff7878;
    }
  }

  th {
    background-color: #170524;
    border-radius: 10px;
    padding: 0.2em;
    color: white;
  }

  table {
    width: 100%;
    text-align: center;
    border: 1px solid #1805243d;
    border-radius: 10px;
    overflow: hidden;
    padding: 0.5em;
    box-shadow: 2px 2px 4px #00000038;
    margin-top: 3em;
  }

  td {
    font-size: 0.8em;
    padding: 0.5em 0;
  }

  .row_alternate {
    & > td {
      background-color: #80808040;
      border-radius: 10px;
      padding: 0.2em;
    }
  }

  .Dropdown-root {
    font-size: 1em;
    margin: 0.2em 0;
    padding: 0.2em 0.9em;
    border-radius: 20px;
    background-color: #150123;
    color: white;
    border: 0;
  }

  .Dropdown-control {
    background-color: transparent;
    border: none;
    color: #fff;
  }

  .Dropdown-arrow {
    border-color: white transparent transparent;
    border-width: 10px 10px 0;
    content: ' ';
    right: 1px;
    top: 20px;
  }

  .is-open .Dropdown-arrow {
    border-color: transparent transparent white;
    border-width: 0 10px 10px;
  }

  .Dropdown-menu {
    left: 50%;
    transform: translateX(-50%);
    background-color: #1f1029;
    border-radius: 10px;
    overflow-x: hidden;
  }

  .Dropdown-option {
    color: rgb(236 236 236 / 80%);
    text-align: left;
    transition: all 0.2s ${(props) => props.theme.functions.default_curve};
  }

  .lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.titles};
  }

  html, body {
    background: ${(props) => props.theme.colors.background_color};
    max-width: 100vw;
    overflow-x: hidden;
  }

  @media screen and (min-width: 50em){
    html {
        font-size: calc((14px + (20 - 14) * (100vw - 400px) / (800 - 400)) / 1.7);
    }
  }

  @media screen and (min-width: 25em){
    html {
        font-size: calc((14px + (20 - 14) * (100vw - 400px) / (800 - 400)) / 1.7);
    }
  }

  @media screen and (min-width: 25em){
    html {
        font-size: calc((14px + (20 - 14) * (100vw - 400px) / (800 - 400)) / 1.7);
    }
  }
`;
