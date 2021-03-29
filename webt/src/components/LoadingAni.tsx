import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
function LoadingAni() {
  return <Container>Loading...</Container>;
}

export default LoadingAni;
