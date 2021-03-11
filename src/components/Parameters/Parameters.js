import React from "react";

import classes from "./Parameters.css";
import Header from "./Header/Header";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/fontawesome-free-solid';
import {faMinus} from '@fortawesome/fontawesome-free-solid';
import {connect} from "react-redux";
import styled from "styled-components";

const Div = styled.div`
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowLight};
`;

const Main = styled.main`
  th,
  td {
    border: 1px solid ${props => props.theme.border};
  }
  
  th {
    background-color: ${props => props.theme.bg3};
    color: ${props => props.theme.text1};
  }
  
  input {
    background-color: transparent;
  
    &:focus {
      border-color: ${props => props.theme.text2};
    }
    
    &[type="checkbox"] {
      text-align: center !important;
    }
  }
  
  .Active td,
  .Active td input{
    background-color: ${props => props.theme.bg1};
    color: ${props => props.theme.text1};
  }
  
  .Inactive td,
  .Inactive td input {
    background-color: ${props => props.theme.bg2};
    color: ${props => props.theme.text2};
  }
  
  @media only screen and (max-width: 575.98px) {
    
  }
`;

const Parameters = (props) => {
  let params = (
    <table>
      <thead>
      <tr>
        <th className={classes.Check}></th>
        <th>Key</th>
        <th>Value</th>
        <th><FontAwesomeIcon icon={faMinus}/></th>
      </tr>
      </thead>
      <tbody>
      {props.parameters.map(param => (
        <tr key={param.id} className={param.check ? "Active" : "Inactive"}>
          <td>
            <input
              type="checkbox"
              onChange={() => props.check(param.id)} checked={param.check}/>
          </td>
          <td>
            <input
              value={param.key}
              onChange={(event) => props.change(event, param.id, 0)}
              disabled={!param.check}
            />
          </td>
          <td>
            <input
              value={param.value}
              onChange={(event) => props.change(event, param.id, 1)}
              disabled={!param.check}
            />
          </td>
          <td>
            {props.parameters.length === 1 ? null :
              <button className={classes.Trash}
                      onClick={() => props.remove(param.id)}>
                <FontAwesomeIcon icon={faTrash}/>
              </button>}

          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );

  return (
    <Div className={classes.Parameters}>
      <Header add={props.add}/>
      <Main className={classes.Body}>
        {params}
      </Main>
    </Div>
  )
}

const mapStateToProps = state => {
  return {
    parameters: state.parameters
  };
}

export default connect(mapStateToProps)(Parameters);