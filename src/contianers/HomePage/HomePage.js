import React from 'react';

import classes from "./HomePage.css";
import AddressBar from "../../components/AddressBar/AddressBar";
import Response from "../Response/Response";
import Parameters from "../../components/Parameters/Parameters";
import axios from "axios";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions";
import Methods from "../../store/Methods";

class HomePage extends React.Component {
  sendRequestHandler = (e) => {
    e.preventDefault();
    this.props.updateIsLoading(true);
    const startTime = Date.now();
    if (this.props.method === Methods[0]) {
      axios.get(this.props.URL)
        .then(response => {
          const time = Date.now() - startTime;
          this.props.updateIsLoading(false);
          this.props.updateResponse({
            ...response,
            time: time
          });
        })
        .catch(error => {
          const time = Date.now() - startTime;
          this.props.updateIsLoading(false);
          this.props.updateResponse({
            ...error.response,
            time: time
          })
        });
    } else if (this.props.method === Methods[1]) {
      axios.post(this.props.URL)
        .then((response) => {
          const time = Date.now() - startTime;
          this.props.updateIsLoading(false);
          this.props.updateResponse({
            ...response,
            time: time
          });
        })
        .catch(error => {
          const time = Date.now() - startTime;
          this.props.updateIsLoading(false);
          this.props.updateResponse({
            ...error.response,
            time: time
          });
        });
    }
  }

  updateURLHandler = () => {
    let activeParams = this.props.parameters.filter(x => x.check === true);

    let newURL = this.props.URL;
    if (newURL.includes("?")) {
      newURL = newURL.slice(0, newURL.indexOf("?"));
    }

    if (activeParams.length === 0) {
      this.props.changeURL(newURL);
      return;
    }

    newURL += "?";
    activeParams.forEach((obj, index) => {
      if (obj.check && index === 0) {
        newURL += obj.key + "=" + obj.value;
      } else if (obj.check) {
        newURL += "&" + obj.key + "=" + obj.value;
      }
    });
    this.props.changeURL(newURL);
  }

  addParamHandler = () => {
    this.props.addParameter();
    this.updateURLHandler();
  }

  removeParamHandler = (id) => {
    this.props.removeParameter(id);
    this.updateURLHandler();
  }

  changeParamHandler = (event, id, value) => {
    if (value === 0) {
      this.props.changeParameterKey({id: id, val: event.target.value});
    } else {
      this.props.changeParameterValue({id: id, val: event.target.value});
    }

    this.updateURLHandler();
  }

  changeCheckboxHandler = (id) => {
    this.props.changeParameterCheck(id);
    this.updateURLHandler();
  }

  changeTabHandler = (item) => {
    this.setState({tab: item});
  }

  render() {
    let responseBody;
    responseBody = (
      <Response
        change={this.props.updateViewResponseOptionTab}
      />);

    return (
      <div className={classes.RequestPanel}>
        <AddressBar
          changeURL={this.props.changeURL}
          method={this.props.method}
          changeMethod={this.props.changeMethod}
          send={this.sendRequestHandler}/>
        <Parameters
          change={this.changeParamHandler}
          remove={this.removeParamHandler}
          add={this.addParamHandler}
          check={this.changeCheckboxHandler}/>
        {responseBody}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    URL: state.URL,
    method: state.method,
    parameters: state.parameters,
    response: state.response
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeURL: (url) => dispatch({type: actionTypes.CHANGE_URL, val: url}),
    changeMethod: (method) => dispatch({type: actionTypes.CHANGE_METHOD, val: method}),
    addParameter: () => dispatch({type: actionTypes.ADD_PARAMETER}),
    removeParameter: (id) => dispatch({type: actionTypes.REMOVE_PARAMETER, id: id}),
    changeParameterCheck: (id) => dispatch({type: actionTypes.CHANGE_PARAMETER_CHECK, id: id}),
    changeParameterKey: (payload) => dispatch({type: actionTypes.CHANGE_PARAMETER_KEY, payload: payload}),
    changeParameterValue: (payload) => dispatch({type: actionTypes.CHANGE_PARAMETER_VALUE, payload: payload}),
    updateResponse: (response) => dispatch({type: actionTypes.UPDATE_RESPONSE, payload: response}),
    updateViewResponseOptionTab: (tab) => dispatch({type: actionTypes.UPDATE_VIEW_RESPONSE_OPTION_TAB, val: tab}),
    updateIsLoading: (isLoading) => dispatch({type: actionTypes.UPDATE_IS_LOADING, val: isLoading})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);