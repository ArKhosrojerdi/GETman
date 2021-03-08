import React from "react";
import {connect} from "react-redux";

import Aux from "../../../../hoc/Aux/Aux";
import classes from "./MainHeader.css";
import styled from "styled-components";

import {NavLink, useLocation} from "react-router-dom";
import DarkLogo from "../../../../assets/images/dark-logo512.png";
import LightLogo from "../../../../assets/images/logo512.png";

const Header = styled.header`
    background-color: ${props => props.theme.bg2};
    box-shadow: ${props => props.theme.shadowDark};
  `;

const Button = styled.button`
    color: ${props => props.theme.text2};
    
    &:hover {
      transition: all .15s ease;
      color: ${props => props.theme.text1};
      box-shadow: ${props => props.theme.shadowLight};
    }
    
    &.Active {
      color: ${props => props.theme.text1};
      background-color: ${props => props.theme.mainBg} !important;
      box-shadow: ${props => props.theme.shadowDarkIn};
      
      &:hover {
        background-color: ${props => props.theme.mainBg};
        cursor: default;
      }
    }
  `;

const MainHeader = (props) => {
  let path = useLocation().pathname;

  return (
    <Aux>
      <Header className={classes.Header}>
        <div className={classes.Container}>
          <div className={classes.Logo}>
            {props.theme === "light" ? <img src={LightLogo} alt="GETman logo"/> :
              <img src={DarkLogo} alt="GETman logo"/>}
          </div>
          <div className={classes.Links}>
            <NavLink to="/settings" className={classes.Link}>
              <Button className={path === "/settings" ? "Active" : ""}>
                Settings
              </Button>
            </NavLink>
            <NavLink to="/" className={classes.Link}>
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