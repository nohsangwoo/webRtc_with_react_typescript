import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: -1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000;
  color: #ffffff;
  font-size: 0.8rem;
`;

const SecondArea = () => {
  const date = new Date();
  const Hour = date.getHours();
  const Minute = date.getMinutes();
  function fillZero(obj) {
    obj = '000000000000000' + obj;
    const result = obj.substring(obj.length - 2);
    return result;
  }

  return <Container>{`${Hour}:${fillZero(Minute)}`}</Container>;
};

export default SecondArea;
