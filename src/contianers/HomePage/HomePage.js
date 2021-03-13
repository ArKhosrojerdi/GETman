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
    this.props.updateResponseIsLoading(true);
    const startTime = Date.now();
    if (this.props.method === Methods[0]) {
      axios.get(this.props.URL)
        .then(response => {
          const time = Date.now() - startTime;
          this.props.updateResponseIsLoading(false);
          this.props.updateResponse({
            ...response,
            time: time
          });
        })
        .catch(error => {
          const time = Date.now() - startTime;
          this.props.updateResponseIsLoading(false);
          this.props.updateResponse({
            ...error.response,
            time: time
          })
        });
    } else if (this.props.method === Methods[1]) {
      axios.post(this.props.URL)
        .then((response) => {
          const time = Date.now() - startTime;
          this.props.updateResponseIsLoading(false);
          this.props.updateResponse({
            ...response,
            time: time
          });
        })
        .catch(error => {
          const time = Date.now() - startTime;
          this.props.updateResponseIsLoading(false);
          this.props.updateResponse({
            ...error.response,
            time: time
          });
        });
    }
  }

  addParamHandler = () => {
    this.props.addParameter();
  }

  removeParamHandler = (id) => {
    this.props.removeParameter(id);
  }

  changeCheckboxHandler = (id) => {
    this.props.changeParameterCheck(id);
  }

  changeParamHandler = (event, id, value) => {
    const payload = {id: id, val: event.target.value};
    if (value === 0) {
      this.props.changeParameterKey(payload);
    } else {
      this.props.changeParameterValue(payload);
    }
  }

  changeTabHandler = (item) => {
    this.setState({tab: item});
  }

  render() {
    const responseBody = <Response change={this.props.updateViewResponseOptionTab}/>;

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
    changeMethod: (method) => dispatch({type: actionTypes.CHANGE_METHOD, val: method}),
    addParameter: () => dispatch({type: actionTypes.ADD_PARAMETER}),
    removeParameter: (id) => dispatch({type: actionTypes.REMOVE_PARAMETER, id: id}),
    changeParameterCheck: (id) => dispatch({type: actionTypes.CHANGE_PARAMETER_CHECK, id: id}),
    changeParameterKey: (payload) => dispatch({type: actionTypes.CHANGE_PARAMETER_KEY, payload: payload}),
    changeParameterValue: (payload) => dispatch({type: actionTypes.CHANGE_PARAMETER_VALUE, payload: payload}),
    updateResponse: (response) => dispatch({type: actionTypes.UPDATE_RESPONSE, payload: response}),
    updateViewResponseOptionTab: (tab) => dispatch({type: actionTypes.UPDATE_VIEW_RESPONSE_OPTION_TAB, val: tab}),
    updateResponseIsLoading: (isLoading) => dispatch({type: actionTypes.UPDATE_RESPONSE_IS_LOADING, val: isLoading})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);