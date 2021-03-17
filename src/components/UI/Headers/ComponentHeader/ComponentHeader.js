import React from "react";
import styled from "styled-components";

// TODO: Move static styles to css file.
const Header = styled.header`
  color: ${props => props.theme.text1};
  background-color: ${props => props.theme.bg1};
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: .75rem;
  height: 3.5rem;
  box-sizing: border-box;
  transition: all .15s ease;
  
  & h4 {
    line-height: 2rem;
  }
  
  @media only screen and (max-width: 575.98px) {
    font-size: 14px;
    height: 2.75rem;
    padding: .5rem;
    
    & button {
      font-size: 14px;
      padding: 0;
    }
    
    & h4 {
      line-height: 1.75rem;
    }
  }
`;

const ComponentHeader = (props) => {
  return (
    <Header className={props.classes}>{props.children}</Header>
  );
}

export default ComponentHeader;