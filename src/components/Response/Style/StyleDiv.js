import styled from "styled-components";
import classes from "./StyleDiv.css";

const Div = styled.div`
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text1};
  box-shadow: ${props => props.theme.shadowLight};
`;

const StyleDiv = (props) => {
  return (
    <Div className={classes.ResponseBox}>{props.children}</Div>
  );
}

export default StyleDiv;