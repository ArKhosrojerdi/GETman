import React from 'react';

import classes from "./RequestPanel.css";
import AddressBar from "../../components/AddressBar/AddressBar";
import Response from "../Response/Response";
import Parameters from "../../components/Parameters/Parameters";
import axios from "axios";

class RequestPanel extends React.Component {
  state = {
    URL: "https://jsonplaceholder.typicode.com/posts",
    methods: ["GET", "POST"],
    method: "",
    response: {},
    status: "",
    statusText: "",
    parameters: [
      {id: 0, key: 'postId', value: 1, check: false},
      {id: 1, key: 'comment', value: 2, check: false}
    ],
    counter: 2,
    navbar: ["pretty", "raw", "preview"],
    tab: "",
    used: false,
    resTime: 0
  }

  componentDidMount() {

    this.setState({method: this.state.methods[0]})
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //
  // }

  changeURLHandler = (event) => {
    this.setState({URL: event.target.value});
  }

  changeMethodHandler = (event) => {
    this.setState({method: event.target.value});
  }

  sendRequestHandler = () => {
    const startTime = Date.now();
    if (this.state.method === this.state.methods[0]) {
      axios.get(this.state.URL)
        .then(response => {
          const responseTime = Date.now() - startTime;
          let resp = {};
          for (const [key, value] of Object.entries(response.data)) {
            resp[key] = value;
          }
          this.setState({
            response: resp,
            status: response.status,
            statusText: response.statusText,
            resTime: responseTime
          });
          if (!this.state.used) {
            this.setState({
              tab: this.state.navbar[0],
              used: true
            });
          }
        })
        .catch(error => this.setState({response: error}));
    } else if (this.state.method === this.state.methods[1]) {
      axios.post(this.state.URL)
        .then((response) => {
          const responseTime = Date.now() - startTime;
          this.setState({
            response: response,
            status: response.status,
            statusText: response.statusText,
            used: true,
            resTime: responseTime
          });

          if (!this.state.used) {
            this.setState({
              tab: this.state.navbar[0],
              used: true
            });
          }
        })
        .catch(error => this.setState({response: error}));
    }
  }

  updateURLHandler = () => {
    let params = [...this.state.parameters];
    let activeParams = params.filter(x => x.check === true);

    let newURL = this.state.URL;
    if (newURL.includes("?")) {
      newURL = newURL.slice(0, newURL.indexOf("?"));
    }

    if (activeParams.length === 0) {
      this.setState({URL: newURL});
      return;
    }

    newURL += "?";
    activeParams.forEach((obj, index) => {
      if (obj.check && index === 0) {
        newURL += obj.key + "=" + obj.value;
      } else if (obj.check) {
        newURL += "&" + obj.key + "=" + obj.value;
      }
    })

    this.setState({URL: newURL});
  }

  addParamHandler = () => {
    let params = [...this.state.parameters];
    let id = this.state.counter;
    let emptyObj = {id: id, key: "", value: "", check: true}
    params.push(emptyObj);

    id++;
    this.setState({parameters: params, counter: id}, this.updateURLHandler);
  }

  removeParamHandler = (id) => {
    let params = [...this.state.parameters];
    let index = params.map(x => x.id).indexOf(id);

    params.splice(index, 1);
    this.setState({parameters: params}, this.updateURLHandler);
  }

  changeParamsHandler = (event, id, value) => {
    let params = [...this.state.parameters];
    let param = params.find(x => x.id === id);
    if (value === 0) {
      param.key = event.target.value;
    } else {
      param.value = event.target.value;
    }

    this.setState({parameters: params}, this.updateURLHandler);
  }

  checkboxHandler = (id) => {
    let params = [...this.state.parameters];
    let index = params.map(x => x.id).indexOf(id);
    let p = params.filter(x => x.id === id)[0];
    params[index].check = !p.check;

    this.setState({parameters: params});
    this.updateURLHandler();
  }

  changeTabHandler = (item) => {
    this.setState({tab: item, used: true});
  }

  render() {
    let responseBody;
    responseBody =
      <Response
        responseObj={this.state.response}
        status={this.state.status}
        statusText={this.state.statusText}
        nav={this.state.navbar}
        tab={this.state.tab}
        change={this.changeTabHandler}
        used={this.state.used}
        time={this.state.resTime}
      />

    return (
      <div className={classes.RequestPanel}>
        <AddressBar
          url={this.state.URL}
          urlHandler={this.changeURLHandler}
          method={this.changeMethodHandler}
          methods={this.state.methods}
          send={this.sendRequestHandler}/>
        <Parameters
          params={this.state.parameters}
          change={this.changeParamsHandler}
          remove={this.removeParamHandler}
          add={this.addParamHandler}
          check={this.checkboxHandler}/>
        {responseBody}
      </div>
    )
  }
}

export default RequestPanel;