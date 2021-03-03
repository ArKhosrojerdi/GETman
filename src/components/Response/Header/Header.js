import React from "react";

import classes from "./Header.css";

const Header = (props) => {
  let status;
  if (props.status === 200) {
    status = (<span className={classes.Success}>{props.status} OK</span>)
  } else {
    status = (<span className={classes.Fail}>{props.status + " " + props.statusText}</span>)
  }

  return (
    <div className={classes.Header}>
      <h4>Response</h4>
      <div className={classes.Status}>
        <h6>
          Status:&nbsp;
          {status}
        </h6>
        <h6>Time: {props.time}ms</h6>
      </div>
    </div>
  )
}

export default Header;