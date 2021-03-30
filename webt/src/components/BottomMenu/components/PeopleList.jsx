import React from 'react';
import styled from 'styled-components';
import PeopleIcon from '@material-ui/icons/People';

const Container = styled.div`
  cursor: pointer;
`;

const PeopleList = () => {
  return (
    <Container>
      <PeopleIcon />
    </Container>
  );
};

export default PeopleList;
