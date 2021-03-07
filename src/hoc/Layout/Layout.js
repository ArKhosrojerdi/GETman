import React from 'react';
import {Route} from "react-router";

import Aux from '../Aux/Aux';
import Header from "../../components/UI/Headers/MainHeader/MainHeader";
import Settings from "../../contianers/Settings/Settings";
import RequestPanel from "../../contianers/RequestPanel/RequestPanel";

class Layout extends React.Component {
  render() {
    return (
      <Aux>
        <Header/>
        <Route path="/" exact component={RequestPanel}/>
        <Route path="/settings" component={Settings}/>
      </Aux>
    )
  }
}

export default Layout;