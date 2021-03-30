import React from 'react';
import styled from 'styled-components';
import ExitTo from './components/ExitTo';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SecondBottomParts = () => {
  return (
    <Container>
      <ExitTo />
    </Container>
  );
};

export default SecondBottomParts;
