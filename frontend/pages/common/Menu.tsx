import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = () => {
  return (
    <MenuContainer>
      <Link to="/">
        <Content>Home</Content>
      </Link>
      <Link to="/add-card">
        <Content>Add a card</Content>
      </Link>
    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.div`
  display: flex;
  height: 30px;
`;

const Content = styled.div`
  margin: 0 20px;
`;
