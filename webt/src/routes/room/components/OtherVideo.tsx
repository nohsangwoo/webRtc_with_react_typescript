import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.video`
  border: 2px solid black;
  object-fit: cover;
  height: 100%;
  width: 70px;
  margin: 0 5px;
  &:hover {
    border: 2px solid blue;
  }
`;

type Props = {
  peer: any;
};

function OtherVideo(props: Props) {
  const ref: any | null = useRef();

  useEffect(() => {
    props.peer.on('stream', (stream: any) => {
      ref.current.srcObject = stream;
    });

    // eslint-disable-next-line
  }, []);

  return <Container playsInline autoPlay ref={ref} />;
}

export default OtherVideo;
