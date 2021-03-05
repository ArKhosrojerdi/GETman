// TODO: Don't rerender this component after changing in address bar

import React from "react";

import classes from "./Response.css";
import Tabs from "./Tabs/Tabs";
import Header from "./Header/Header";

const Response = (props) => {
  let element = [];

  function printObj(responseObj) {
    let className, key, body;
    const TYPES = {
      KEY: "[__Key__]",
      NUM: "[__Number__]",
      STR: "[__String__]",
      BOOL: "[__Boolean__]",
      NULL: "[__Null__]"
    };

    for (let i = 0; i < responseObj.length; i++) {
      className = "";
      key = responseObj[i].split(':')[0];
      if (responseObj[i].indexOf(TYPES.KEY) > -1) {
        key = key.replace(TYPES.KEY, "");
        responseObj[i] = responseObj[i].replace(TYPES.KEY, "");
      }
      key = key.replace(/ /g, '\u00a0');

      body = responseObj[i].split(':')[1];
      // console.log(body);
      if (body === undefined) {
        body = key;
        key = null;
      } else {
        if (body.indexOf(TYPES.NUM) > -1) {
          body = body.replace(TYPES.NUM, "");
          className = "Number";
        }
        if (body.indexOf(TYPES.STR) > -1) {
          body = body.replace(TYPES.STR, "");
          className = "String";
        }
        if (body.indexOf(TYPES.BOOL) > -1) {
          body = body.replace(TYPES.BOOL, "");
          className = "Boolean";
        }
        if (body.indexOf(TYPES.NULL) > -1) {
          body = body.replace(TYPES.NULL, "");
          className = "Null";
        }
        body = body.replace(",", "");
      }

      switch (className) {
        case 'Number':
          element.push(
            <li key={i}>
              <b className={classes.Key}>{key}</b>:
              <span className={classes.Number}>{body}</span>
              {responseObj[i][responseObj[i].length - 1] === "," ? "," : ""}
            </li>
          );
          break;
        case 'String':
          element.push(
            <li key={i}>
              <b className={classes.Key}>{key}</b>:
              <span className={classes.String}>{body}</span>
              {responseObj[i][responseObj[i].length - 1] === "," ? "," : ""}
            </li>
          );
          break;
        case 'Boolean':
          element.push(
            <li key={i}>
              <b className={classes.Key}>{key}</b>:
              <span className={classes.Boolean}>{body}</span>
              {responseObj[i][responseObj[i].length - 1] === "," ? "," : ""}
            </li>
          );
          break;
        case 'Null':
          element.push(
            <li key={i}>
              <b className={classes.Key}>{key}</b>:
              <span className={classes.Number}>{body}</span>
              {responseObj[i][responseObj[i].length - 1] === "," ? "," : ""}
            </li>
          );
          break;
        default:
          element.push(
            <li key={i}>
              <b className={classes.Key}>{key}</b>
              {key === null ? "" : ":"}
              <span>{body}</span>
            </li>
          );
      }

    }
  }

  function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
      let cls = 'Number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'Key';
        } else {
          cls = 'String';
        }
      } else if (/true|false/.test(match)) {
        cls = 'Boolean';
      } else if (/null/.test(match)) {
        cls = 'Null';
      }
      return '[__' + cls + '__]' + match;
    });
  }

  let resObj = JSON.stringify(props.responseObj, undefined, 4);
  let synHighlighted = syntaxHighlight(resObj);
  synHighlighted = synHighlighted.split("\n");
  printObj(synHighlighted);

  let response;
  if (props.used) {
    if (props.tab === "preview") {
      response = (
        <div>
          <p>{JSON.stringify(props.responseObj)}</p>
        </div>
      )
    } else {
      response = (
        <div>
          <ol className={classes.Response}>
            {element}
          </ol>
        </div>
      );
    }
  }

  return (
    <div className={classes.ResponseBox}>
      <Header
        status={props.status}
        statusText={props.statusText}
        time={props.time}/>
      <Tabs
        navigation={props.nav}
        tab={props.tab}
        change={props.change}/>
      <div className={classes.Body}>
        {props.used ? response : ""}
      </div>
    </div>
  )
}

export default Response;