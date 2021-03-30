import React from 'react';
import styled from 'styled-components';
import FirstBottomParts from './FirstBottomParts';
import SecondBottomParts from './SecondBottomParts';
import ThirdBottomParts from './ThirdBottomParts';

//91 67
const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Bottom = styled.div`
  height: 4rem;
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
`;

const BottomMemu = () => {
  return (
    <Container>
      <Bottom>
        <FirstBottomParts />
        <SecondBottomParts />
        <ThirdBottomParts />
      </Bottom>
    </Container>
  );
};

export default BottomMemu;
