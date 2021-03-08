import styled from "styled-components";
import classes from "./StyleMain.css";

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
        padding: .5rem;
        margin: 0;
        background-color: ${props => props.theme.bg1};
      }
  `;

const StyleMain = (props) => {
  return (<Main className={classes.Main}>{props.children}</Main>);
}

export default StyleMain;