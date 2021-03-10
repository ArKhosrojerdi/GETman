import React from "react";
import {connect} from "react-redux";

import classes from "./Tabs.css";
import styled from "styled-components";
import ViewResponseOptions from "../../../store/ViewResponseOptions";


const Ul = styled.ul`
    background-color: ${props => props.theme.bg3};
    
    & li {
      color: ${props => props.theme.text2};
      
      &:hover {
        color: ${props => props.theme.text1};
      }
      
      &.Active {
        background-color: ${props => props.theme.mainBg};
        box-shadow: ${props => props.theme.shadowLightIn};
        color: ${props => props.theme.text1};
        cursor: default;
        transform: translateY(0) !important;
      
        &::after {
          background: ${props => props.theme.mainBg};
          content: "";
          position: absolute;
          top: 31px;
          right: 1.5px;
          width: 61px;
          height: 1.5px;
        }
      }
    }
  `;

const Tabs = (props) => {
  return (
    <Ul className={classes.Tabs}>
      {ViewResponseOptions.map(navItem => (
        <li onClick={() => props.change(navItem)} key={navItem}
            className={props.tab === navItem ? "Active" : ""}>{navItem}</li>
      ))}
    </Ul>
  )
}

const mapStateToProps = state => {
  return {
    tab: state.viewResponseOptionTab
  }
}

export default connect(mapStateToProps)(Tabs);