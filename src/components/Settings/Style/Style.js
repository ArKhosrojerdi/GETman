import React from "react";
import styled from "styled-components";

const Div = styled.div`
      border: 1px solid ${props=>props.theme.border};
      box-shadow: ${props=>props.theme.shadowDark};
      text-align: center;
      width: 50%;
      margin: auto;
      
      label {
        color: ${props=>props.theme.text1};
        text-shadow: ${props=>props.theme.textShadow};
      }
      
      input, select {
        color: ${props=>props.theme.text1};
        background-color: ${props=>props.theme.mainBg};
        box-shadow: ${props=>props.theme.shadowLight};
        border: 1px solid ${props=>props.theme.border};
      } 
      
      input:focus, select:focus {
        border: 1px solid ${props=>props.theme.text2};
      }
    `;

const Style = (props) => {
  return (
    <Div>{props.children}</Div>
  );
}

export default Style;