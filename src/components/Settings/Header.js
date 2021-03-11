import React from "react";
import styled from "styled-components";
import SettingsHeader from "../UI/Headers/ComponentHeader/ComponentHeader";

// TODO: Move static styles to css file.
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
    animation: appear .2s ease;
    
    &:hover {
      transition: all .15s ease;
      color: ${props => props.theme.bg1};
      box-shadow: ${props => props.theme.shadowLight};
      background-color: ${props => props.theme.blue};
    }
    
    @keyframes appear {
      from {
        opacity: 0;
        transform: translateX(-1rem);
      }
      
      to {
        opacity: 1;
      }
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
      {props.showSave ? <Button onClick={props.save}>Save</Button> : null}
    </SettingsHeader>
  )
}

export default Header;