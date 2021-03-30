import React from 'react';
import ShareIcon from '@material-ui/icons/Share';
import styled from 'styled-components';

const Container = styled.div`
  cursor: pointer;
`;
const ShareComponent = () => {
  return (
    <Container>
      <ShareIcon />
    </Container>
  );
};

export default ShareComponent;
