import React from 'react';
import {Route} from "react-router";

import Misc from '../Misc/Misc';
import Header from "../../components/UI/Headers/MainHeader/MainHeader";
import Settings from "../../contianers/Settings/Settings";
import HomePage from "../../contianers/HomePage/HomePage";

function Layout(props) {
  return (
    <Misc>
      <Header/>
      <Route path="/" exact>
        <HomePage {...props}/>
      </Route>
      <Route path="/settings">
        <Settings {...props}/>
      </Route>
    </Misc>
  )
}

export default Layout;