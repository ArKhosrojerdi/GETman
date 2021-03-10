import React from "react";
import styled from "styled-components";

const Header = styled.header`
  color: ${props => props.theme.text1};
  background-color: ${props => props.theme.bg1};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .75rem;
  height: 3.5rem;
  box-sizing: border-box;
`;

const ComponentHeader = (props) => {
  return (
    <Header className={props.classes}>{props.children}</Header>
  );
}

export default ComponentHeader;