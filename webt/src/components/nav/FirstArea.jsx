import React from 'react';
import styled from 'styled-components';
import Burger from './components/Burger';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FirstArea() {
  return (
    <Container>
      <Burger />
    </Container>
  );
}

export default FirstArea;
