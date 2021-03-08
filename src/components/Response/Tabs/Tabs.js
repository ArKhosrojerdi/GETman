import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import classes from "./Tabs.css";
import {connect} from "react-redux";
import styled from "styled-components";

const Ul = styled.ul`
    background-color: ${props => props.theme.border};
    
    & li {
      color: ${props => props.theme.text2};
      
      &:hover {
        color: ${props => props.theme.text1};
        transition: all .05s ease;
      }
      
      &.Active {
        transform: translateY(0);
        background-color: ${props => props.theme.mainBg} !important;
        box-shadow: ${props => props.theme.shadowLightIn};
        color: ${props => props.theme.text1} !important;
        cursor: default;
      
        &::after {
          content: "";
          position: absolute;
          top: 31px;
          right: 1.5px;
          width: 61px;
          height: 1.5px;
          background: ${props => props.theme.mainBg};
        }
      }
    }
  `;

const Tabs = (props) => {
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