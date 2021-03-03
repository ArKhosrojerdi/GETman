import React from "react";

import classes from "./Response.css";
import Tabs from "./Tabs/Tabs";
import Header from "./Header/Header";

const Response = (props) => {
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
            {Object.keys(props.responseObj).map((obj, index) => (
              <li key={obj}>&nbsp;&nbsp;&nbsp;&nbsp;
                <strong className={classes.Key}>"{obj}"</strong>
                :&nbsp;
                <span className={classes.Value}>{props.responseObj[obj].toString()}</span>
                {index !== Object.keys(props.responseObj).length - 1 ? "," : ""}

                {/*{Object.keys(props.responseObj[obj]).map((nobj) => (*/}
                {/*  // <li>{nobj}: {props.responseObj[obj][nobj]}</li>*/}
                {/*  <h2 key={props.responseObj[obj]}>{nobj}: {props.responseObj[obj][nobj]}</h2>*/}
                {/*  ))}*/}
              </li>
            ))}
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