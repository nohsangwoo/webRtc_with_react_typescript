import React from 'react';
import styled from 'styled-components';
import Burger from './components/Burger';
import MeetBtn from './components/MeetBtn';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
`;

function FirstArea() {
  return (
    <Container>
      <Burger />
      <MeetBtn />
    </Container>
  );
}

export default FirstArea;
