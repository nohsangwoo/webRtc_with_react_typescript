import React from 'react';
import styled from 'styled-components';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';

const Container = styled.div`
  cursor: pointer;
`;
const TextSms = () => {
  return (
    <Container>
      <TextsmsOutlinedIcon />
    </Container>
  );
};

export default TextSms;
