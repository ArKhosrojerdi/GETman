import React from 'react';

import Aux from '../Aux/Aux';
import Header from "../../components/UI/Header/Header";
import classes from './Layout.css';
import RequestPanel from "../../contianers/RequestPanel/RequestPanel";
import {Route} from "react-router";

class Layout extends React.Component {
  render() {
    return (
      <Aux>
        <Header/>
        <Route path="/" exact component={RequestPanel}/>

        <Route path="/settings">
          <div className={classes.Content}>
            {this.props.children}
          </div>
        </Route>
      </Aux>
    )
  }
}

export default Layout;