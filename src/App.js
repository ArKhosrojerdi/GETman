import './App.css';

import React, {useState} from "react";
import Layout from "./hoc/Layout/Layout";
import * as Theme from "./components/UI/Theme/Theme";
import {ThemeProvider} from "styled-components";
import GlobalStyle from "./components/UI/Theme/GlobalTheme/GlobalStyle";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeProvider theme={Theme.themes[theme]}>
      <GlobalStyle theme={theme}/>
      <Layout setTheme={setTheme}/>
    </ThemeProvider>
  );
}

export default App;
