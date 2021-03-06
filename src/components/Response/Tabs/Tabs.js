import React from "react";
import {connect} from "react-redux";

import classes from "./Tabs.css";
import styled from "styled-components";
import ViewResponseOptions from "../../../store/ViewResponseOptions";


const Ul = styled.ul`
    background-color: ${props => props.theme.bg3};
    box-shadow: ${props => props.theme.shadowLightInBottom};
    
    & li {
      color: ${props => props.theme.text2};
      background-color: ${props => props.theme.bg2};
      
      &:hover {
        color: ${props => props.theme.text1};
      }
      
      &::after {
          background: transparent;
          content: "";
          position: absolute;
          top: 31px;
          right: 1.5px;
          width: 69px;
          height: 1.25px;
        }
      
      &.Active {
        background-color: ${props => props.theme.mainBg};
        box-shadow: ${props => props.theme.shadowLightIn};
        color: ${props => props.theme.text1};
        cursor: default;
        transform: translateY(0);
      
        &::after {
          background: ${props => props.theme.mainBg};
          content: "";
          position: absolute;
          top: 31px;
          right: 1.5px;
          width: 69px;
          height: 1.5px;
        }
      }
    }
  `;

const Tabs = (props) => {
  return (
    <div>
      <Ul className={classes.Tabs}>
        {ViewResponseOptions.map(navItem => (
          <li onClick={() => props.change(navItem)} key={navItem}
              className={props.tab === navItem ? "Active" : ""}>{navItem}</li>
        ))}
      </Ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    tab: state.viewResponseOptionTab
  }
}

export default connect(mapStateToProps)(Tabs);