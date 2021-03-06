import React from "react";

import classes from "./Settings.css";
import Aux from "../../hoc/Aux/Aux";

class Settings extends React.Component {
  state = {
    indent: 4
  }

  render() {
    return (
      <Aux>
        <div className={classes.Settings}>
          <input type="number" value={this.state.indent}/>
        </div>
      </Aux>
    );
  }
}

export default Settings;