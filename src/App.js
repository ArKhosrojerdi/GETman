import './App.css';

import Layout from "./hoc/Layout/Layout";
import React from "react";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
