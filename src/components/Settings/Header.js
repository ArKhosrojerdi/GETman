import React from "react";
import styled from "styled-components";
import SettingsHeader from "../UI/Headers/ComponentHeader/ComponentHeader";
import Transition from "react-transition-group/Transition";
import classes from "./Header.css";

const Button = styled.button`
  cursor: pointer;
  outline: none;
  color: ${props => props.theme.blue};
  border: 1px solid ${props => props.theme.blue};
  background-color: ${props => props.theme.bg1};
  box-sizing: border-box;
  padding: 0 .5rem;
  font-size: 16px;
  height: 2rem;
  width: 4rem;

  &:hover {
    transition: all .15s ease;
    color: ${props => props.theme.bg1};
    box-shadow: ${props => props.theme.shadowLight};
    background-color: ${props => props.theme.blue};
  }
    
  @media only screen and (max-width: 575.98px) {
    height: 100%;
    width: 3.25rem;
  }
`;

const Header = (props) => {
  return (
    <SettingsHeader>
      <h4>Settings</h4>
      <Transition
        in={props.showSave}
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        {state => {
          return (
            <Button
              onClick={props.save}
              className={state === 'exiting' ? classes.Hide : classes.Show}
            >
              Save
            </Button>
          )
        }}
      </Transition>
    </SettingsHeader>
  )
}

export default Header;