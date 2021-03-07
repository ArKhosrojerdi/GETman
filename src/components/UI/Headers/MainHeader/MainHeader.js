import React from "react";
import {connect} from "react-redux";

import Aux from "../../../../hoc/Aux/Aux";
import classes from "./MainHeader.css";
import styled from "styled-components";

import {NavLink, useLocation} from "react-router-dom";
import DarkLogo from "../../../../assets/images/dark-logo512.png";
import LightLogo from "../../../../assets/images/logo512.png";
import * as Theme from "../../Theme/Theme";

const MainHeader = (props) => {
  let path = useLocation().pathname;

  const theme = Theme.themes[props.theme];

  const Header = styled.header`
    background-color: ${theme.bg2};
    box-shadow: ${theme.shadowDark};
  `;

  const Button = styled.button`
    color: ${theme.text2};
    
    &:hover {
      transition: all .15s ease-out;
      color: ${theme.text1};
      box-shadow: ${theme.shadowLight};
    }
    
    &.Active {
      color: ${theme.text1};
      background-color: ${theme.mainBg} !important;
      box-shadow: ${theme.shadowDarkIn};
      
      &:hover {
        background-color: ${theme.mainBg};
        cursor: default;
      }
    }
  `;

  return (
    <Aux>
      <Header className={classes.Header}>
        <div className={classes.Container}>
          <div className={classes.Logo}>
            {props.theme === "light" ? <img src={LightLogo} alt="GETman logo"/> :
              <img src={DarkLogo} alt="GETman logo"/>}
          </div>
          <div className={classes.Links}>
            <NavLink to="/settings">
              <Button className={path === "/settings" ? "Active" : ""}>
                Settings
              </Button>
            </NavLink>
            <NavLink to="/">
              <Button className={path === "/" ? "Active" : ""}>
                Home
              </Button>
            </NavLink>
          </div>
        </div>
      </Header>
    </Aux>
  )
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme
  };
};

export default connect(mapStateToProps)(MainHeader);