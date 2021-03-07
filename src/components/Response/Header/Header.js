import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import ResponseHeader from "../../UI/Headers/Header/Header";

import * as Theme from "../../UI/Theme/Theme";

import classes from "./Header.css";

const Header = (props) => {
  const theme = Theme.themes[props.theme];

  let status;
  if (props.status === 200) {
    status = (<span className={classes.Success}>{props.status} OK</span>)
  } else {
    status = (<span className={classes.Fail}>{props.status + " " + props.statusText}</span>)
  }

  return (
    <ResponseHeader>
      <h4>Response</h4>
      <div className={classes.Status}>
        <h6>
          Status:&nbsp;
          {status}
        </h6>
        <h6>Time: {props.time}ms</h6>
      </div>
    </ResponseHeader>
  )
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
}

export default connect(mapStateToProps)(Header);