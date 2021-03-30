import React from 'react';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(208, 208, 208, 1);
  border-radius: 50%;
  cursor: pointer;
`;
const FlipCamera = () => {
  return (
    <Container>
      <FlipCameraIosIcon style={{ fill: 'white' }} />
    </Container>
  );
};

export default FlipCamera;
