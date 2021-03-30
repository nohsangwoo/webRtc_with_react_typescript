import React from 'react';
import styled from 'styled-components';
import FlipCamera from './components/FlipCamera';
import RightMenu from './components/RightMenu';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0.5rem;
  .FlipCamera {
    margin-right: 1.6rem;
  }
`;

const ThirdArea = () => {
  return (
    <Container>
      <div className="FlipCamera">
        <FlipCamera />
      </div>
      <RightMenu />
    </Container>
  );
};

export default ThirdArea;
