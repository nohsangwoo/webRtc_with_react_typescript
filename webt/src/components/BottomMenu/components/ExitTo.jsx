import React from 'react';
import styled from 'styled-components';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const Container = styled.div`
  position: absolute;
  top: -1.6rem;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3f51b5;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;
const ExitTo = () => {
  return (
    <Container>
      <ExitToAppIcon />
    </Container>
  );
};

export default ExitTo;
