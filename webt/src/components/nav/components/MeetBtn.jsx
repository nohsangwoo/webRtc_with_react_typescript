import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #6caad3;
  border-radius: 50%;
  color: #ffffff;
  font-size: 0.6rem;
  cursor: pointer;
`;
const MeetBtn = () => {
  return <Container>MEET</Container>;
};

export default MeetBtn;
