import React from 'react';

import classes from "./HomePage.css";
import AddressBar from "../../components/AddressBar/AddressBar";
import Response from "../Response/Response";
import Parameters from "../../components/Parameters/Parameters";
import axios from "axios";

class HomePage extends React.Component {
  state = {
    URL: "https://jsonplaceholder.typicode.com/posts",
    methods: ["GET", "POST"],
    method: "",
    response: {
      data: "",
      status: 0,
      statusText: "",
      time: 0
    },
    parameters: [
      {id: 0, key: 'postId', value: 1, check: false},
      {id: 1, key: 'comment', value: 2, check: false}
    ],
    counter: 2,
    navbar: ["pretty", "raw", "preview"],
    tab: "",
    used: false,
  }

  componentDidMount() {
    this.setState({method: this.state.methods[0]})
  }

  changeURLHandler = (event) => {
    this.setState({URL: event.target.value});
  }

  changeMethodHandler = (event) => {
    this.setState({method: event.target.value});
  }

  saveRequestResponse = (response) => {
    this.setState({
      response: {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        time: response.time
      }
    });
  }

  updateUseStateHandler = () => {
    if (!this.state.used) {
      this.setState({
        tab: this.state.navbar[0],
        used: true
      });
    }
  }

  sendRequestHandler = (e) => {
    e.preventDefault();
    const startTime = Date.now();
    if (this.state.method === this.state.methods[0]) {
      axios.get(this.state.URL)
        .then(response => {
          // let resp = {};
          // for (const [key, value] of Object.entries(response.data)) {
          //   resp[key] = value;
          // }

          const time = Date.now() - startTime;
          this.saveRequestResponse({
            ...response,
            time: time
          });
          this.updateUseStateHandler();
        })
        .catch(error => {
          const time = Date.now() - startTime;
          this.saveRequestResponse({
            ...error.response,
            time: time
          })
        });
    } else if (this.state.method === this.state.methods[1]) {
      axios.post(this.state.URL)
        .then((response) => {
          const time = Date.now() - startTime;
          this.saveRequestResponse({
            ...response,
            time: time
          });
          this.updateUseStateHandler();
        })
        .catch(error => {
          const time = Date.now() - startTime;
          this.saveRequestResponse({
            ...error.response,
            time: time
          });
        });
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
        responseObj={this.state.response.data}
        status={this.state.response.status}
        statusText={this.state.response.statusText}
        nav={this.state.navbar}
        tab={this.state.tab}
        change={this.changeTabHandler}
        used={this.state.used}
        time={this.state.response.time}
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

export default HomePage;