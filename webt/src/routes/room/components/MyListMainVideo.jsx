import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.video`
  object-fit: cover;
  height: 100%;
  width: 5rem;
  margin: 0 5px;
`;

function MyListMainVideo(props) {
  const ref = useRef();
  useEffect(() => {
    ref.current.srcObject = props.mainStream;
  }, [props.mainStream]);

  return <Container playsInline autoPlay ref={ref} />;
}

export default MyListMainVideo;
