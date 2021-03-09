import React from "react";
import ResponseHeader from "../../UI/Headers/ComponentHeader/ComponentHeader";

import classes from "./Header.css";

const Header = (props) => {
  let status, statusText;
  statusText = props.status + " " + props.statusText;
  if (props.status >= 500) {
    status = (<span className={classes.Red}>{statusText}</span>)
  } else if (props.status >= 400) {
    status = (<span className={classes.Orange}>{statusText}</span>)
  } else if (props.status >= 300) {
    status = (<span className={classes.Yellow}>{statusText}</span>)
  } else if (props.status >= 200) {
    status = (<span className={classes.Green}>{statusText}</span>)
  } else if (props.status >= 100) {
    status = (<span className={classes.Teal}>{statusText}</span>)
  } else {
    status = "";
  }

  return (
    <ResponseHeader>
      <h4>Response</h4>
      <div className={classes.Status}>
        <h6>
          Status:&nbsp;
          {status}
        </h6>
        <h6>Time: {props.time}ms</h6>
      </div>
    </ResponseHeader>
  )
}

export default Header;