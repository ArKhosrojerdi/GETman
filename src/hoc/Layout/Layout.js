import React from 'react';
import {Route} from "react-router";

import Aux from '../Aux/Aux';
import Header from "../../components/UI/Headers/MainHeader/MainHeader";
import Settings from "../../contianers/Settings/Settings";
import RequestPanel from "../../contianers/RequestPanel/RequestPanel";

function Layout(props) {
  return (
    <Aux>
      <Header/>
      {/*<Route path="/" exact component={RequestPanel}/>*/}
      <Route path="/" exact>
        <RequestPanel {...props}/>
      </Route>
      <Route path="/settings">
        <Settings {...props}/>
      </Route>
    </Aux>
  )
}

export default Layout;