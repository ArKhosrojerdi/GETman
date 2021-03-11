import React from 'react';
import {Route} from "react-router";

import Aux from '../Aux/Aux';
import Header from "../../components/UI/Headers/MainHeader/MainHeader";
import Settings from "../../contianers/Settings/Settings";
import HomePage from "../../contianers/HomePage/HomePage";

function Layout(props) {
  return (
    <Aux>
      <Header/>
      <Route path="/" exact>
        <HomePage {...props}/>
      </Route>
      <Route path="/settings">
        <Settings {...props}/>
      </Route>
    </Aux>
  )
}

export default Layout;