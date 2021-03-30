import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.video`
  object-fit: cover;
  height: 100%;
  width: 70px;
  margin: 0 5px;

  ${({ isSelect }) =>
    isSelect
      ? css`
          border: 2px solid blue;
        `
      : css`
          border: 2px solid yellow;
        `}
`;

function OtherVideo(props) {
  const [otherStream, setOtherStream] = useState(null);
  const ref = useRef();

  useEffect(() => {
    props?.peer.on('stream', stream => {
      ref.current.srcObject = stream;
      setOtherStream(stream);
    });

    console.log('othervideo activate: ', props.isSelect);

    // eslint-disable-next-line
  }, [props.isSelect]);

  useEffect(() => {
    if (props.isSelect) {
      props.userVideo.current.srcObject = otherStream;
    }
  }, [props.userVideo, props.isSelect, otherStream]);
  console.log('check Stream!!!!!', otherStream);
  return <Container playsInline autoPlay ref={ref} isSelect={props.isSelect} />;
}

export default OtherVideo;
