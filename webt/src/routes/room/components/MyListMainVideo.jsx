import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.video`
  object-fit: cover;
  height: 100%;
  width: 70px;
  margin: 0 5px;
  border: 2px solid black;
`;

function MyListMainVideo(props) {
  const ref = useRef();
  useEffect(() => {
    ref.current.srcObject = props.mainStream;
  }, []);

  return <Container playsInline autoPlay ref={ref} />;
}

export default MyListMainVideo;
