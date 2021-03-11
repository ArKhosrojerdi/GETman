import React from "react";
import {createGlobalStyle} from "styled-components";

const Global = createGlobalStyle`
  body {
    background-color: ${props => props.theme.mainBg};
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.bg1};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.bg3};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.bg2};
  }
`;

const GlobalStyle = () => {
  return (
    <Global/>
  );
}

export default GlobalStyle;