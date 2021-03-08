import React from "react";
import {createGlobalStyle} from "styled-components";

const Global = createGlobalStyle`
    body {
      background-color: ${props => props.theme.mainBg}
    }
  `;

const GlobalStyle = () => {
  return (
    <Global/>
  );
}

export default GlobalStyle;