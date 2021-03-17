import React from "react";
import {connect} from "react-redux";

import Misc from "../../../../hoc/Misc/Misc";
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

const Img = styled.div`
  background: url("${props => props.theme.id === 0 ? LightLogo : DarkLogo}") no-repeat;
`;


const MainHeader = () => {
  let path = useLocation().pathname;

  return (
    <Misc>
      <Header className={classes.Header}>
        <div className={classes.Container}>
          <div className={classes.Logo}>
            <Img/>
          </div>
          <div className={classes.Links}>
            <NavLink to="/settings" className={classes.Link}>
              {/* TODO: replace("Active", classes.Active) or use the actual active selector */}
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
    </Misc>
  )
}

const mapStateToProps = state => {
  return {
    // theme: state.theme
  }
}

export default connect(mapStateToProps)(MainHeader);