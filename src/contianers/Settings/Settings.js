import React from "react";
import styled from "styled-components";
import SettingsHeader from "../../components/UI/Headers/Header/Header";

import classes from "./Settings.css";
import Aux from "../../hoc/Aux/Aux";
import {connect} from "react-redux";
import Header from "../../components/Settings/Header";
import * as Theme from "../../components/UI/Theme/Theme";

class Settings extends React.Component {
  state = {
    indent: 4,
    themes: ["light", "dark"],
    theme: "light"
  }

  componentDidMount() {
    this.setState({indent: this.props.indent, theme: this.props.theme});
  }

  changeIndentHandler = (e) => {
    let value = parseInt(e.target.value, 10);
    if (typeof value !== "number") {
      return;
    } else {
      value = parseInt(e.target.value, 10);
      if (isNaN(value)) {
        value = "";
      }
      if (value > 8) return;
      this.setState({indent: value})
    }
  }

  changeThemeHandler = (e) => {
    this.setState({theme: e.target.value});
  }

  fixEmptyValueForInput = () => {
    if (this.state.indent === "" || this.state.indent === 0)
      this.setState({indent: 2})
  }

  render() {
    const theme = Theme.themes[this.props.theme];

    const Div = styled.div`
      border: 1px solid ${theme.border};
      box-shadow: ${theme.shadowDark};
      
      label {
        color: ${theme.text1};
        text-shadow: ${theme.textShadow};
      }
      
      input, select {
        color: ${theme.text1};
        background-color: ${theme.mainBg};
        box-shadow: ${theme.shadowLight};
        border: 1px solid ${theme.border};
      } 
      
      input:focus, select:focus {
        border: 1px solid ${theme.text2};
      }
    `;

    return (
      <Aux>
        <Div className={classes.Settings}>
          <Header
            save={() => this.props.changeSettings({indent: this.state.indent, theme: this.state.theme})}/>
          <div className={classes.Body}>
            <div className={classes.Row}>
              <div className={classes.Indent}>
                <label htmlFor="indent">Indent:</label>
                <input
                  id="indent"
                  type="text"
                  onChange={(event) => this.changeIndentHandler(event)}
                  value={this.state.indent}
                  onBlur={this.fixEmptyValueForInput}/>
              </div>

              <div className={classes.Theme}>
                <label htmlFor="theme">Theme:</label>
                <select id="theme" value={this.state.theme}
                        onChange={(event) => this.changeThemeHandler(event)}>
                  {this.state.themes.map((theme, index) => (
                    <option
                      key={index}
                      value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    indent: state.indent,
    theme: state.theme
  };
}

const mapDispatchToProps = dispatch => {
  return {
    changeSettings: (newIndent) => dispatch({type: "SAVE_SETTINGS", payload: newIndent})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);