// TODO: Don't rerender this component after changing in address bar

import React from "react";

import classes from "./Response.css";
import Tabs from "./Tabs/Tabs";
import Header from "./Header/Header";
import Tab from "../../hoc/Tab/Tab";

const Response = (props) => {
  let resObj = {...props.responseObj};
  let element = [], index = 0;

  function printObj(obj) {
    // for (key in obj) {
    Object.keys(obj).forEach((key, i) => {
      let value = obj[key];
      // delete obj[key]; // pop
      if (typeof value === 'object' && value !== null) {
        element.push(
          <li key={index++}><Tab indent={4}/>
            <strong className={classes.Key}>{'"'}{key}{'"'}</strong>
            : {"{"}
          </li>
        );
        printObj(value);
        element.push(
          <li key={index++}><Tab indent={4}/>
            {"},"}
          </li>
        );
        // return;
      } else {
        console.log(i, Object.keys(obj).length);
        if (i === Object.keys(obj).length - 1) {
          element.push(
            <li key={index++}><Tab indent={8}/>
              <strong className={classes.Key}>{'"'}{key}{'"'}</strong>
              :&nbsp;
              <span className={classes.Value}>{value.toString()}</span>
            </li>
          );
        } else {
          element.push(
            <li key={index++}><Tab indent={8}/>
              <strong className={classes.Key}>{'"'}{key}{'"'}</strong>
              :&nbsp;
              <span className={classes.Value}>{value},</span>
            </li>
          );
        }
      }
    })
  }

  // function syntaxHighlight(json) {
  //   json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  //   return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
  //     let cls = 'Number';
  //     if (/^"/.test(match)) {
  //       if (/:$/.test(match)) {
  //         cls = 'Key';
  //       } else {
  //         cls = 'String';
  //       }
  //     } else if (/true|false/.test(match)) {
  //       cls = 'Boolean';
  //     } else if (/null/.test(match)) {
  //       cls = 'Null';
  //     }
  //     return '<span className="cls">' + match + '</span>';
  //   });
  // }

  resObj = {
    a: 1,
    'b': 'foo',
    c: [
      false,
      'false',
      null,
      'null',
      {
        d:
          {
            e: 1.3e5,
            f:
              '1.3e5'
          }
      }
    ]
  };
  // let resObj = JSON.stringify(props.responseObj, undefined, 4);
  // element = (<div dangerouslySetInnerHTML={{__html: syntaxHighlight(resObj)}}/>);
  // console.log(resObj);
  printObj(resObj);
  // element = element.slice(0, 4);
  console.log(element);

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
            <li>{"{"}</li>
            {/*{Object.keys(props.responseObj).map((obj, index) => (*/}
            {/*  <li key={obj}>&nbsp;&nbsp;&nbsp;&nbsp;*/}
            {/*    <strong className={classes.Key}>"{obj}"</strong>*/}
            {/*    :&nbsp;*/}
            {/*    <span className={classes.Value}>{props.responseObj[obj].toString()}</span>*/}
            {/*    {index !== Object.keys(props.responseObj).length - 1 ? "," : ""}*/}

            {/*    /!*{Object.keys(props.responseObj[obj]).map((nobj) => (*!/*/}
            {/*    /!*  // <li>{nobj}: {props.responseObj[obj][nobj]}</li>*!/*/}
            {/*    /!*  <h2 key={props.responseObj[obj]}>{nobj}: {props.responseObj[obj][nobj]}</h2>*!/*/}
            {/*    /!*  ))}*!/*/}
            {/*  </li>*/}
            {/*))}*/}
            {element}
            <li>{"}"}</li>
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