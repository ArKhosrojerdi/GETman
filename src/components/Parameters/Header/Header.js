import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid";
import ParametersHeader from "../../UI/Headers/ComponentHeader/ComponentHeader";
import styled from "styled-components";

const Button = styled.button`
    color: #388e3c;
    background-color: ${props => props.theme.bg1};
    text-align: center !important;
    vertical-align: center !important;
    height: 2rem;
    width: 2rem;
    box-sizing: border-box;
    border: 1px solid #388e3c !important;
    font-size: 16px;
    
    &:hover {
      transition: all .15s ease;
      box-shadow: ${props => props.theme.shadowDark};
      background-color: #388e3c;
      color: #ffffff;
    }
    
    &:active {
      box-shadow: ${props => props.theme.shadowDarkIn};
      border: transparent !important;
      background-color: #358b39;
    }
    
    @media only screen and (max-width: 575.98px) {
      text-align: center !important;
      height: 1.75rem;
      width: 1.75rem;
      
      & svg {
        text-align: center !important;
      }
    }
  `;

const Header = (props) => {
  return (
    <ParametersHeader>
      <h4>Parameters</h4>
      <Button onClick={props.add}><FontAwesomeIcon icon={faPlus}/></Button>
    </ParametersHeader>
  )
}

export default Header;