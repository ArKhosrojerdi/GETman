import React from "react";
import Aux from "../Aux/Aux";

const Tab = (props) => {
  let element = [];
  for (let i = 0; i < props.indent; i++) {
    element.push(
      <Aux key={i}>&nbsp;</Aux>
    );
  }

  return (
    <Aux>
      {element}
    </Aux>
  )
}

export default Tab;