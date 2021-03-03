import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import classes from "./Header.css";

import {NavLink, useLocation} from "react-router-dom";

const Header = () => {
  let path = useLocation().pathname;

  return (
    <Aux>
      <header className={classes.Header}>
        <div className={classes.Container}>
          <div className={classes.Logo}>
            <b>
              GET
            </b>
            man
          </div>
          <div className={classes.Links}>
            <NavLink to="/settings">
              <button className={path === "/settings" ? classes.Active : {}}>
                Settings
              </button>
            </NavLink>
            <NavLink to="/">
              <button className={path === "/" ? classes.Active : {}}>
                Home
              </button>
            </NavLink>
          </div>
        </div>
      </header>
    </Aux>
  )
}

export default Header;