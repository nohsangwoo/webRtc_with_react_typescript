import React from 'react';
import styled from 'styled-components';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
const RightMenu = () => {
  return (
    <Container>
      <MoreVertIcon style={{ fill: 'white' }} />
    </Container>
  );
};

export default RightMenu;
