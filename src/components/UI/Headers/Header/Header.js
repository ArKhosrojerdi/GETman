import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import * as Theme from "../../Theme/Theme";
// import classes from "./Header.css";

const Header = (props) => {
  const theme = Theme.themes[props.theme];

  const Header = styled.header`
    color: ${theme.text1};
    background-color: ${theme.bg1};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .75rem;
    height: 3.5rem;
    box-sizing: border-box;
  `;

  return (
    <Header className={props.classes}>{props.children}</Header>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
}

export default connect(mapStateToProps)(Header);