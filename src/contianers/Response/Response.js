// TODO: Don't rerender this component after changing in address bar

import React from "react";

import classes from "./Response.css";
import Tabs from "../../components/Response/Tabs/Tabs";
import Header from "../../components/Response/Header/Header";
import Row from "../../components/Response/Row/Row";
import ParametersHeader from "../../components/UI/Headers/Header/Header";
import * as Theme from "../../components/UI/Theme/Theme";
import styled from "styled-components";
import {connect} from "react-redux";

class Response extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.responseObj !== this.props.responseObj || nextProps.tab !== this.props.tab;
  }

  printObj(responseObj, element) {
    let className, key, body;
    const TYPES = {
      KEY: "[__Key__]",
      NUM: "[__Number__]",
      STR: "[__String__]",
      BOOL: "[__Boolean__]",
      NULL: "[__Null__]"
    };

    for (let i = 0; i < responseObj.length; i++) {
      className = "";
      key = responseObj[i].split(':')[0];
      if (responseObj[i].indexOf(TYPES.KEY) > -1) {
        key = key.replace(TYPES.KEY, "");
        responseObj[i] = responseObj[i].replace(TYPES.KEY, "");
      }
      key = key.replace(/ /g, '\u00a0');

      body = responseObj[i].split(':')[1];
      if (body === undefined) {
        body = key;
        key = null;
      } else {
        if (body.indexOf(TYPES.NUM) > -1) {
          body = body.replace(TYPES.NUM, "");
          className = "Number";
        }
        if (body.indexOf(TYPES.STR) > -1) {
          body = body.replace(TYPES.STR, "");
          className = "String";
        }
        if (body.indexOf(TYPES.BOOL) > -1) {
          body = body.replace(TYPES.BOOL, "");
          className = "Boolean";
        }
        if (body.indexOf(TYPES.NULL) > -1) {
          body = body.replace(TYPES.NULL, "");
          className = "Null";
        }
        body = body.replace(",", "");
      }

      switch (className) {
        case 'Number':
          element.push(
            <Row
              key={i}
              classes={
                {
                  Item: classes.Item,
                  Key: this.props.tab === "pretty" ? classes.Key : null,
                  Type: this.props.tab === "pretty" ? classes.Number : null
                }
              }
              keys={key}
              body={body}
              isEOL={responseObj[i][responseObj[i].length - 1]}
            />
          );
          break;
        case 'String':
          element.push(
            <Row
              key={i}
              classes={
                {
                  Item: classes.Item,
                  Key: this.props.tab === "pretty" ? classes.Key : null,
                  Type: this.props.tab === "pretty" ? classes.String : null
                }
              }
              keys={key}
              body={body}
              isEOL={responseObj[i][responseObj[i].length - 1]}/>
          );
          break;
        case 'Boolean':
          element.push(
            <Row
              key={i}
              classes={
                {
                  Item: classes.Item,
                  Key: this.props.tab === "pretty" ? classes.Key : null,
                  Type: this.props.tab === "pretty" ? classes.Boolean : null
                }
              }
              keys={key}
              body={body}
              isEOL={responseObj[i][responseObj[i].length - 1]}/>
          );
          break;
        case 'Null':
          element.push(
            <Row
              key={i}
              classes={
                {
                  Item: classes.Item,
                  Key: this.props.tab === "pretty" ? classes.Key : null,
                  Type: this.props.tab === "pretty" ? classes.Null : null
                }
              }
              keys={key}
              body={body}
              isEOL={responseObj[i][responseObj[i].length - 1]}/>
          );
          break;
        default:
          element.push(
            <li key={i}>
              <b className={this.props.tab === "pretty" ? classes.Key : null}>{key}</b>
              {key === null ? "" : ":"}
              <span>{body}</span>
            </li>
          );
      }
    }
    return element;
  }

  syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
      let cls = 'Number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'Key';
        } else {
          cls = 'String';
        }
      } else if (/true|false/.test(match)) {
        cls = 'Boolean';
      } else if (/null/.test(match)) {
        cls = 'Null';
      }
      return '[__' + cls + '__]' + match;
    });
  }

  render() {
    let response, element = [];
    let resObj = JSON.stringify(this.props.responseObj, undefined, this.props.indent);
    let synHighlighted = this.syntaxHighlight(resObj);
    synHighlighted = synHighlighted.split("\n");
    element = this.printObj(synHighlighted, element);

    const theme = Theme.themes[this.props.theme];
    const Div = styled.div`
      border: 1px solid ${theme.border};
      color: ${theme.text1};
      box-shadow: ${theme.shadowLight};
    `;

    const Main = styled.main`
      background-color: ${theme.bg2};
      
        // & p {
        //   background-color: ${theme.bg2};
        // }
        
        & > div {
          background-color: ${theme.bg2};
        }
        
        & li {
          background-color: ${theme.bg1};
        }
    `;

    if (this.props.used) {
      if (this.props.tab === "preview") {
        response = (
          <div>
            <p className={classes.Preview}>{JSON.stringify(this.props.responseObj)}</p>
          </div>
        )
      } else {
        response = (
          <div>
            <ol className={classes.Response} style={this.props.tab === "raw" ? {listStyle: "none", padding: 0} : {}}>
              {element}
            </ol>
          </div>
        );
      }
    }

    return (
      <Div className={classes.ResponseBox}>
        <Header
          status={this.props.status}
          statusText={this.props.statusText}
          time={this.props.time}/>
        <Tabs
          navigation={this.props.nav}
          tab={this.props.tab}
          change={this.props.change}/>
        <Main className={classes.Body}>
          {this.props.used ? response : ""}
        </Main>
      </Div>
    )
  }
}

const mapStateToProps = state => {
  return {
    indent: state.indent,
    theme: state.theme
  };
}

export default connect(mapStateToProps)(Response);