import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import classes from "./Header.css";

import {NavLink, useLocation} from "react-router-dom";
import DarkLogo from "../../../assets/images/dark-logo512.png";

const Header = () => {
  let path = useLocation().pathname;

  return (
    <Aux>
      <header className={classes.Header}>
        <div className={classes.Container}>
          <div className={classes.Logo}>
            <img src={DarkLogo} alt="GETman logo"/>
            {/*<b>*/}
            {/*  GET*/}
            {/*</b>*/}
            {/*man*/}
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