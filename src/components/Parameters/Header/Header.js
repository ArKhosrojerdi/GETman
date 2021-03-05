import React from "react";

import classes from "./Header.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid";

const Header = (props) => {
  return (
    <div className={classes.Header}>
      <h4>Parameters</h4>
      <h4>
        <button className={classes.Plus} onClick={props.add}><FontAwesomeIcon icon={faPlus}/></button>
      </h4>
    </div>
  )
}

export default Header;