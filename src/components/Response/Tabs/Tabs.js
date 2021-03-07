import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import classes from "./Tabs.css";
import * as Theme from "../../UI/Theme/Theme";
import {connect} from "react-redux";
import styled from "styled-components";

const Tabs = (props) => {
  const theme = Theme.themes[props.theme];

  const Ul = styled.ul`
    background-color: ${theme.border};
    
    & li {
      color: ${theme.text2};
      
      &:hover {
        color: ${theme.text1};
        transition: all .05s ease-out;
      }
      
      &.Active {
        transform: translateY(0);
        background-color: ${theme.mainBg} !important;
        box-shadow: ${theme.shadowLightIn};
        color: ${theme.text1} !important;
        cursor: default;
      
        &::after {
          content: "";
          position: absolute;
          top: 31px;
          right: 1.5px;
          width: 61px;
          height: 1.5px;
          background: ${theme.mainBg};
        }
      }
    }
  `;

  return (
    <Aux>
      <Ul className={classes.Tabs}>
        {props.navigation.map(navItem => (
          <li onClick={() => props.change(navItem)} key={navItem}
              className={props.tab === navItem ? "Active" : ""}>{navItem}</li>
        ))}
      </Ul>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
}

export default connect(mapStateToProps)(Tabs);