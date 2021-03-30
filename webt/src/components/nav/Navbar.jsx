import React from 'react';
import styled from 'styled-components';
import FirstArea from './FirstArea';
import SecondArea from './SecondArea';
import ThirdArea from './ThirdArea';
//91 67

const Nav = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding-left: 20px;
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  border: 2px solid red;

  .logo {
    padding: 15px 0;
  }
  /* div {
    &:nth-child(1) {
    }
  } */
`;

function Navbar() {
  return (
    <Nav>
      <FirstArea />
      <SecondArea />
      <ThirdArea />
    </Nav>
  );
}

export default Navbar;
