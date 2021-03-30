import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import RightNav from './RightNav';
//91 67
const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid red;
  z-index: 10;
  width: 100%;
  height: 67px;
  /* display: flex; */
  background-color: #f0f0f0;
  display: grid;
  /* grid-template-columns: 1fr; */
`;

const Nav = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  .logo {
    padding: 15px 0;
  }
`;

function Navbar() {
  return (
    <Nav>
      <div className="logo">NavBar</div>
      <Burger />
      <RightNav />
    </Nav>
  );
}

export default Navbar;
