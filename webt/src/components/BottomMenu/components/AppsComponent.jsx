import React from 'react';
import styled from 'styled-components';
import AppsIcon from '@material-ui/icons/Apps';

const Container = styled.div`
  cursor: pointer;
`;

const AppsComponent = () => {
  return (
    <Container>
      <AppsIcon />
    </Container>
  );
};

export default AppsComponent;
