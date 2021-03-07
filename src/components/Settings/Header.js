import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import SettingsHeader from "../UI/Headers/Header/Header";
import * as Theme from "../UI/Theme/Theme";

const Header = (props) => {
  const theme = Theme.themes[props.theme];

  const Button = styled.button`
    cursor: pointer;
    outline: none;
    color: ${theme.blue};
    border: 1px solid ${theme.blue};
    background-color: ${theme.bg1};
    height: 2rem;
    box-sizing: border-box;
    padding: 0 .75rem;
    font-size: 16px;
    
    &:hover {
      transition: all .15s ease-out;
      color: ${theme.bg1};
      box-shadow: ${theme.shadowLight};
      background-color: ${theme.blue};
    }
  `;

  return (
    <SettingsHeader>
      <h4>Settings</h4>
      <div>
        <Button onClick={props.save}>
          Save
        </Button>
      </div>
    </SettingsHeader>
  )
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
}

export default connect(mapStateToProps)(Header);