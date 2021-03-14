import React from "react";

import classes from "./Settings.css";
import {connect} from "react-redux";
import Header from "../../components/Settings/Header";
import styled from "styled-components";
import Themes from "../../store/Themes";
import Dropdown from "../../components/UI/Dropdown/Dropdown";

const Div = styled.div`
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowDark};
  
  label {
    color: ${props => props.theme.text1};
    text-shadow: ${props => props.theme.textShadow};
  }
  
  input {
    color: ${props => props.theme.text1};
    background-color: ${props => props.theme.mainBg};
    box-shadow: ${props => props.theme.shadowLight};
    border: 1px solid ${props => props.theme.border};
  } 
  
  input:focus {
    border: 1px solid ${props => props.theme.text2};
  }
`;

const DropdownPanel = styled.div`
  button {
    color: ${props => props.theme.text2};
    background-color: ${props => props.theme.mainBg};
    box-shadow: ${props => props.theme.shadowLight};
    border: 1px solid ${props => props.theme.border};
  } 
  
  button:focus {
    border: 1px solid ${props => props.theme.text2};
  }
`;

class Settings extends React.Component {
  state = {
    indent: 4,
    theme: "light"
  }

  componentDidMount() {
    this.setState({indent: this.props.indent, theme: this.props.theme});
  }

  changeIndentHandler = (e) => {
    let value = parseInt(e.target.value, 10);
    if (typeof value !== "number") {

    } else {
      value = parseInt(e.target.value, 10);
      if (isNaN(value)) {
        value = "";
      }
      if (value > 8) return;
      this.setState({indent: value})
    }
  }

  changeThemeHandler = (index) => {
    this.setState({theme: Themes[index]});
  }

  fixEmptyValueForInput = () => {
    if (this.state.indent === "" || this.state.indent === 0)
      this.setState({indent: 2})
  }

  changeTheme = () => {
    this.props.setTheme(this.state.theme);
    this.props.changeSettings({indent: this.state.indent, theme: this.state.theme})
  }

  render() {
    return (
      <Div className={classes.Settings}>
        <Header
          save={this.changeTheme}
          showSave={this.state.indent !== this.props.indent || this.state.theme !== this.props.theme}/>
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

            <DropdownPanel className={classes.Theme}>
              <label htmlFor="theme">Theme:</label>
              <Dropdown
                button={this.state.theme}
                changeMethod={this.changeThemeHandler}
                items={Themes}/>
            </DropdownPanel>
          </div>
        </div>
      </Div>
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