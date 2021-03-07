import React from 'react';

import classes from './AddressBar.css';
import {connect} from "react-redux";
import * as Theme from "../UI/Theme/Theme";
import styled from "styled-components";

const AddressBar = (props) => {
  const theme = Theme.themes[props.theme];

  const Div = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 3.5rem;
    border: 1px solid ${theme.border};
    padding: .5rem;
    box-sizing: border-box;
    box-shadow: ${theme.shadowDark};
    
    & select {
    color: ${theme.text1};
      border: 1px solid ${theme.border};
      background-color: transparent;
      
      &:hover, &:active, &:focus {
        border: 1px solid ${theme.border};
        box-shadow: ${theme.shadowLight};
      }
    }
    
    & input {
      background-color: ${theme.mainBg};
      border: 1px solid ${theme.border};
      color: ${theme.text1};
      
      &:focus {
        background-color: ${theme.bg1} !important;
      }
      
      &:active {
        background-color: ${theme.bg1};
      }
    }
    
    button {
      &:hover {
        transition: all .15s ease-out;
        border: 1px solid transparent;
        box-shadow: ${theme.shadowLight};
        background-color: #43a047;
        color: #ffffff;
      }
      
      &:hover, &:active, &:focus {
        //border: 1px solid ${theme.border};
        box-shadow: ${theme.shadowLight};
      }
    }
    
    @media only screen and (max-width: 575.98px) {
      flex-direction: column;
      justify-content: center;
      height: auto;
  `;

  const select = (
    <select
      name="method"
      id="method"
      onChange={props.method}>
      {props.methods.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )

  return (
    <Div className={classes.AddressBar}>
      {select}
      <input type="text" placeholder="http://example.com/api" value={props.url}
             onChange={(event) => props.urlHandler(event)}/>
      <button onClick={props.send}>
        Send
      </button>
    </Div>
  )
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
}

export default connect(mapStateToProps)(AddressBar);