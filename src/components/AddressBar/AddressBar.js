import React from 'react';

import classes from './AddressBar.css';
import {connect} from "react-redux";
import styled from "styled-components";
import Methods from "../../store/Methods";
import * as actionTypes from "../../store/actions";
import Dropdown from "../UI/Dropdown/Dropdown";

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
  
  & button {
    &:hover {
      box-shadow: ${props => props.theme.shadowLight};
    }
    
    &:hover, &:active, &:focus {
      box-shadow: ${props => props.theme.shadowLight};
    }
  }
`;

const Div = styled.div`
  position: relative;
  width: 6rem;
  margin-right: .5rem;
  margin-left: 0;
  
  @media only screen and (max-width: 575.98px) {
    width: 6rem !important;
  }
`;

const AddressBar = (props) => {
  function setParameters(urlValue) {
    if (!urlValue.includes("?")) {
      props.setParams([{id: 0, key: "", value: "", check: false}]);
      return;
    }

    let url = urlValue.split(/\?(.+)/)[1], params = [{id: 0, key: "", value: "", check: true}], pair;
    if (urlValue.includes("&") && url) {
      url = url.split("&");
    }

    if (url === undefined) return;
    else if (typeof url === "string") {
      if (url.includes("=")) {
        pair = url.split(/=(.+)/);
        params[0].key = pair[0].replace("=", "");
        if (pair.length !== 1) params[0].value = pair[1];
      } else {
        params[0].key = url;
      }
    } else {
      params = [];
      for (const [index, param] of url.entries()) {
        if (param.includes("=")) {
          pair = param.split(/=(.+)/);
          if (pair.length === 1) {
            params.push({id: index, key: pair[0].replace("=", ""), value: "", check: true})
          } else {
            params.push({id: index, key: pair[0], value: pair[1], check: true})
          }
        } else {
          params.push({id: index, key: param, value: "", check: true})
        }
      }
    }
    props.setParams(params);
  }

  return (
    <Form className={classes.AddressBar}>
      <div className={classes.Row}>
        <Dropdown styles={{top: "52px; !important"}}
                  button={props.method}
                  changeMethod={props.changeMethod}
                  items={Methods}/>
        <input type="text" placeholder="http://example.com/api" value={props.URL}
               onChange={(event) => {
                 props.changeURL(event.target.value);
                 setParameters(event.target.value);
               }}/>
      </div>
      <button type="submit" onClick={(event) => props.send(event)}>
        Send
      </button>
    </Form>
  )
}

const mapStateToProps = state => {
  return {
    URL: state.URL,
    parameters: state.parameters
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setParams: (parameters) => dispatch({type: actionTypes.SET_PARAMETERS, payload: parameters})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressBar);