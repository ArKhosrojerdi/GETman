import React from "react";
import { createGlobalStyle } from 'styled-components';
import reducer from "../../../store/reducer";
// console.log(reducer())

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;



export default GlobalStyle;