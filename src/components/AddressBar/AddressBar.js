import React from 'react';

import classes from './AddressBar.css';
import {connect} from "react-redux";
import styled from "styled-components";
import Methods from "../../store/Methods";

const Form = styled.form`
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowDark};
  
  & select {
    color: ${props => props.theme.text1};
    border: 1px solid ${props => props.theme.border};
    
    &:hover, &:active, &:focus {
      border: 1px solid ${props => props.theme.border};
      box-shadow: ${props => props.theme.shadowLight};
    }
  }
  
  & input {
    background-color: ${props => props.theme.mainBg};
    border: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.text1};
    
    &:focus {
      background-color: ${props => props.theme.bg1} !important;
    }
    
    &:active {
      background-color: ${props => props.theme.bg1};
    }
  }
  
  button {
    width: 4rem !important;
    &:hover {
      box-shadow: ${props => props.theme.shadowLight};
      
    }
    
    &:hover, &:active, &:focus {
      box-shadow: ${props => props.theme.shadowLight};
    }
  }
`;

const AddressBar = (props) => {
  const select = (
    <select
      name="method"
      id="method"
      onChange={(event) => props.changeMethod(event.target.value)}
      value={props.method}>
      {Methods.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )

  return (
    <Form className={classes.AddressBar}>
      <div className={classes.Row}>
        {select}
        {/* TODO: Add 2-way binding for parameters. */}
        <input type="text" placeholder="http://example.com/api" value={props.URL}
               onChange={(event) => props.changeURL(event.target.value)}/>
      </div>
      <button type="submit" onClick={(event) => props.send(event)}>
        Send
      </button>
    </Form>
  )
}

const mapStateToProps = state => {
  return {
    URL: state.URL
  };
}
export default connect(mapStateToProps)(AddressBar);