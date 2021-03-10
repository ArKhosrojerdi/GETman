import React from "react";

import classes from "./Response.css";
import Tabs from "../../components/Response/Tabs/Tabs";
import Header from "../../components/Response/Header/Header";
import Row from "../../components/Response/Row/Row";
import {connect} from "react-redux";
import styled from "styled-components";
import {StatusCodes} from "../../store/StatusCodes";
import Loading from "../../components/Loading/Loading";

const Div = styled.div`
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text1};
  box-shadow: ${props => props.theme.shadowLight};
`;

const Main = styled.main`
  background-color: ${props => props.theme.bg2};
 
    & > div {
      background-color: ${props => props.theme.bg2};
      width: 100%;
    }

    & li {
      background-color: ${props => props.theme.bg1};
    }
    
    & p {
      background-color: ${props => props.theme.bg1};
    }
`;

class Response extends React.Component {
  printObj(resData, element) {
    let className, key, body;
    const TYPES = {
      KEY: "[__Key__]",
      NUM: "[__Number__]",
      STR: "[__String__]",
      BOOL: "[__Boolean__]",
      NULL: "[__Null__]"
    };

    for (let i = 0; i < resData.length; i++) {
      className = "";
      key = resData[i].split(':')[0];
      if (resData[i].indexOf(TYPES.KEY) > -1) {
        key = key.replace(TYPES.KEY, "");
        resData[i] = resData[i].replace(TYPES.KEY, "");
      }
      key = key.replace(/ /g, '\u00a0');

      body = resData[i].split(':')[1];
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
                  Key: this.props.viewResponseOptionTab === "pretty" ? classes.Key : null,
                  Type: this.props.viewResponseOptionTab === "pretty" ? classes.Number : null
                }
              }
              keys={key}
              body={body}
              isEOL={resData[i][resData[i].length - 1]}
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
                  Key: this.props.viewResponseOptionTab === "pretty" ? classes.Key : null,
                  Type: this.props.viewResponseOptionTab === "pretty" ? classes.String : null
                }
              }
              keys={key}
              body={body}
              isEOL={resData[i][resData[i].length - 1]}/>
          );
          break;
        case 'Boolean':
          element.push(
            <Row
              key={i}
              classes={
                {
                  Item: classes.Item,
                  Key: this.props.viewResponseOptionTab === "pretty" ? classes.Key : null,
                  Type: this.props.viewResponseOptionTab === "pretty" ? classes.Boolean : null
                }
              }
              keys={key}
              body={body}
              isEOL={resData[i][resData[i].length - 1]}/>
          );
          break;
        case 'Null':
          element.push(
            <Row
              key={i}
              classes={
                {
                  Item: classes.Item,
                  Key: this.props.viewResponseOptionTab === "pretty" ? classes.Key : null,
                  Type: this.props.viewResponseOptionTab === "pretty" ? classes.Null : null
                }
              }
              keys={key}
              body={body}
              isEOL={resData[i][resData[i].length - 1]}/>
          );
          break;
        default:
          element.push(
            <li key={i}>
              <b className={this.props.viewResponseOptionTab === "pretty" ? classes.Key : null}>{key}</b>
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
    let resObj = {...this.props.response.data};
    if (resObj !== "") {
      resObj = JSON.stringify(this.props.response.data, undefined, this.props.indent);
    }
    let synHighlighted = this.syntaxHighlight(resObj);
    synHighlighted = synHighlighted.split("\n");
    element = this.printObj(synHighlighted, element);

    // if (this.props.used) {
    if (this.props.viewResponseOptionTab === "preview") {
      response = (
        // <div>
        <p className={classes.Preview}>{JSON.stringify(this.props.response.data)}</p>
        // </div>
      )
    } else {
      response = (
        <ol className={classes.Response}
            style={this.props.viewResponseOptionTab === "raw" ? {listStyle: "none", padding: 0} : {}}>
          {element}
        </ol>
      );
    }
    // }

    return (
      <Div className={classes.ResponseBox}>
        <Header
          status={this.props.response.status}
          time={this.props.response.time}
          statusText={StatusCodes[this.props.response.status]}/>
        <Tabs
          change={this.props.change}/>
        <Main className={classes.Main}>
          {this.props.isLoading ? <Loading/> : (this.props.response.data !== "" ? response : null)}
        </Main>
      </Div>
    )
  }
}

const mapStateToProps = state => {
  return {
    indent: state.indent,
    viewResponseOptionTab: state.viewResponseOptionTab,
    response: state.response,
    isLoading: state.isLoading
  };
}

export default connect(mapStateToProps)(Response);