import React from 'react';
import {Route} from "react-router";

import Misc from '../Misc/Misc';
import Header from "../../components/UI/Headers/MainHeader/MainHeader";
import Settings from "../../contianers/Settings/Settings";
import HomePage from "../../contianers/HomePage/HomePage";
import {withRouter} from 'react-router-dom';

const Layout = withRouter(props => {
  return (
    <Misc>
      <Header {...props}/>
      <Route path="/settings" children={<Settings {...props}/>}/>
      <Route path="/" exact children={<HomePage {...props}/>}/>
    </Misc>
  )
});

export default Layout;