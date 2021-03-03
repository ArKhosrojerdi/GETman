import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import classes from "./Tabs.css";

const Tabs = (props) => {
  return (
    <Aux>
      <ul className={classes.Tabs}>
        {props.navigation.map(navItem => (
          <li onClick={() => props.change(navItem)} key={navItem}
              className={props.tab === navItem ? classes.Active : ""}>{navItem}</li>
        ))}
      </ul>
    </Aux>
  )
}

export default Tabs;