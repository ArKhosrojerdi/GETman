import React from "react";
import ResponseHeader from "../../UI/Headers/Header/Header";

import classes from "./Header.css";

const Header = (props) => {
  let status;
  if (props.status === 200) {
    status = (<span className={classes.Success}>{props.status} OK</span>)
  } else {
    status = (<span className={classes.Fail}>{props.status + " " + props.statusText}</span>)
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