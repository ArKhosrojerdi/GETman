import './App.css';

import React from "react";
import {connect} from "react-redux";
import Layout from "./hoc/Layout/Layout";
import * as Theme from "./components/UI/Theme/Theme";
import {createGlobalStyle, ThemeProvider} from "styled-components";

const App = (props) => {
  const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${Theme.themes[props.theme].mainBg}
    }
  `;

  return (
    <ThemeProvider theme={Theme.themes[props.theme]}>
      <GlobalStyle whiteColor/>
      <div className="App">
        <Layout>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme
  };
};

export default connect(mapStateToProps)(App);
