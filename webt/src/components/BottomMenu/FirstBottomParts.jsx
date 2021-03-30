import React from 'react';
import styled from 'styled-components';
import AppsComponent from './components/AppsComponent';
import ShareComponent from './components/ShareComponent';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const FirstBottomParts = () => {
  return (
    <Container>
      <ShareComponent />
      <AppsComponent />
    </Container>
  );
};

export default FirstBottomParts;
