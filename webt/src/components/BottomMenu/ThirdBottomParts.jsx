import React from 'react';
import styled from 'styled-components';
import PeopleList from './components/PeopleList';
import TextSms from './components/TextSms';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const ThirdBottomParts = () => {
  return (
    <Container>
      <PeopleList />
      <TextSms />
    </Container>
  );
};

export default ThirdBottomParts;
