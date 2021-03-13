import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/fontawesome-free-solid";
import classes from "./Dropdown.css";
import Misc from "../../../hoc/Misc/Misc";

const Button = styled.button`
  color: ${props => props.theme.text2};
  border: 1px solid ${props => props.theme.border};
`;

const Ul = styled.ul`
  background-color: ${props => props.theme.bg1};
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadowLightLarge};
`;

const Li = styled.li`
  border-top: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text2};
  
  &:first-of-type {
    border-top: none;
  }
  
  &:hover {
    background-color: ${props => props.theme.mainBg};
    color: ${props => props.theme.text1};
  }
`;

const Div = styled.div`
  position: relative;
  width: 6rem;
  margin-right: .5rem;
  margin-left: 0;
  
  @media only screen and (max-width: 575.98px) {
    width: 6rem !important;
  }
`;

class Dropdown extends React.Component {
  state = {
    expanded: false
  }

  toggleExpandedHandler = (event) => {
    event.preventDefault();
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    return (
      <Div>
        <Button
          className={classes.Button}
          onClick={(event) => this.toggleExpandedHandler(event)}>
          {this.props.button}
          {!this.state.expanded
            ? <FontAwesomeIcon icon={faAngleDown} style={{marginLeft: ".5rem"}}/>
            : <FontAwesomeIcon icon={faAngleUp} style={{marginLeft: ".5rem"}}/>}
        </Button>
        <Ul className={classes.Ul} hidden={!this.state.expanded} style={this.props.styles}>
          {this.props.items.map((option, index) => (
            <Li className={classes.Li} key={option} value={option} onClick={(event) => {
              this.props.changeMethod(index);
              this.toggleExpandedHandler(event);
            }}>
              {option}
            </Li>
          ))}
        </Ul>
      </Div>
    )
  }
}

export default Dropdown;