import React from 'react';
import styled from 'styled-components';
import FirstArea from './FirstArea';
import SecondArea from './SecondArea';
import ThirdArea from './ThirdArea';
//91 67
const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  width: 100%;
`;

const Nav = styled.div`
  height: 4rem;
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
`;

function Navbar() {
  return (
    <Container>
      <Nav>
        <FirstArea />
        <SecondArea />
        <ThirdArea />
      </Nav>
    </Container>
  );
}

export default Navbar;
