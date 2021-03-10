import React from "react";
import styled from "styled-components";
import SettingsHeader from "../UI/Headers/ComponentHeader/ComponentHeader";

const Button = styled.button`
    cursor: pointer;
    outline: none;
    color: ${props => props.theme.blue};
    border: 1px solid ${props => props.theme.blue};
    background-color: ${props => props.theme.bg1};
    height: 2rem;
    box-sizing: border-box;
    padding: 0 .75rem;
    font-size: 16px;
    
    &:hover {
      transition: all .15s ease;
      color: ${props => props.theme.bg1};
      box-shadow: ${props => props.theme.shadowLight};
      background-color: ${props => props.theme.blue};
    }
  `;

const Header = (props) => {
  return (
    <SettingsHeader>
      <h4>Settings</h4>
      <div>
        {props.showSave ? <Button onClick={props.save}>Save</Button> : null}

      </div>
    </SettingsHeader>
  )
}

export default Header;