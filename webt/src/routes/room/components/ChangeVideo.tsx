import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.video`
  position: absolute;
  bottom: -30px;
  right: 0;
  z-index: 30;
  object-fit: cover;
  width: 70px;
  margin: 0 5px;
  border: 2px solid yellow;

  &:hover {
    border: 2px solid yellow;
  }
`;
const Wrapper = styled.div`
  color: red;
`;

type Props = {
  peer: any;
};

function ChangeVideo(props: Props) {
  const ref: any | null = useRef();

  useEffect(() => {
    props?.peer.on('stream', (stream: any) => {
      ref.current.srcObject = stream;
    });
    console.log('change video activate', props);

    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <Container playsInline autoPlay ref={ref} />
      asdfasdfasdfasdf
    </Wrapper>
  );
}

export default ChangeVideo;
