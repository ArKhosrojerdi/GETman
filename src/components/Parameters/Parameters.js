import React, {useEffect} from "react";

import classes from "./Parameters.css";
import Header from "./Header/Header";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faDotCircle, faTrash} from '@fortawesome/fontawesome-free-solid';
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
  
  button {
    color: ${props => props.theme.bg3};
  }
  
  .Active {
    & td, td input {
      background-color: ${props => props.theme.bg1};
      color: ${props => props.theme.text1};
    }
    
    & button {
    color: ${props => props.theme.text1};
    border: 1px solid ${props => props.theme.text1};
      
      &:hover {
        color: ${props => props.theme.text2};
      }
    }
  }
  
  .Inactive {
    & td, td input {
      background-color: ${props => props.theme.bg2};
      color: ${props => props.theme.text2};
    }
    
    & button {
      color: transparent;
      border: 1px solid ${props => props.theme.text3};
      
      &:hover {
        color: ${props => props.theme.text3};
        border: 1px solid ${props => props.theme.text3};
      }
    }
  }
  
  @media only screen and (max-width: 575.98px) {
    
  }
`;

const Parameters = (props) => {
  useEffect(() => {
    updateURL();
    // eslint-disable-next-line
  }, [props.parameters]);

  function updateURL() {
    const activeParams = props.parameters.filter(x => x.check === true);

    let newURL = props.URL;
    if (newURL.includes("?")) newURL = newURL.slice(0, newURL.indexOf("?"));

    if (activeParams.length === 0) {
      props.changeURL(newURL);
      return;
    }

    newURL += "?";
    activeParams.forEach((obj, index) => {
      if (obj.check && index === 0) {
        if (obj.value !== null) {
          newURL += obj.key + "=" + obj.value;
        } else {
          newURL += obj.key;
        }
      } else if (obj.check) {
        if (obj.value !== null) {
          newURL += "&" + obj.key + "=" + obj.value;
        } else {
          newURL += "&" + obj.key;
        }
      }
    });
    props.changeURL(newURL);
  }

  let params = (
    <table>
      <thead>
      <tr>
        <th><FontAwesomeIcon icon={faDotCircle}/></th>
        <th>Key</th>
        <th>Value</th>
        <th><FontAwesomeIcon icon={faMinus}/></th>
      </tr>
      </thead>
      <tbody>
      {props.parameters.map(param => (
        <tr key={param.id} className={param.check ? "Active" : "Inactive"}>
          <td>
            <button className={classes.Check}
                    onClick={() => props.change({val: null, id: param.id, type: "check"})}>
              <FontAwesomeIcon icon={faCheck}/>
            </button>
          </td>
          <td>
            <input
              value={param.key}
              onChange={(event) => props.change({val: event.target.value, id: param.id, type: "key"})}
              disabled={!param.check}
            />
          </td>
          <td>
            <input
              value={param.value === null ? "" : param.value}
              onChange={(event) => props.change({val: event.target.value, id: param.id, type: "value"})}
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
    URL: state.URL,
    parameters: state.parameters
  };
}

export default connect(mapStateToProps)(Parameters);