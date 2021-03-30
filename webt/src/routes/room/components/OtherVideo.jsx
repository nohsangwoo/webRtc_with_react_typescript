import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.video`
  object-fit: cover;
  height: 100%;
  width: 5rem;
  margin: 0 5px;

  ${({ isSelect }) =>
    isSelect
      ? css`
          border: 2px solid blue;
        `
      : css`
          border: none;
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

    // eslint-disable-next-line
  }, [props.isSelect]);

  useEffect(() => {
    if (props.isSelect) {
      // 해당 이미지 클릭한경우 메인 비디오 영상을 해당유저의 영상으로 교체!
      props.userVideo.current.srcObject = otherStream;
    }
  }, [props.userVideo, props.isSelect, otherStream]);
  return <Container playsInline autoPlay ref={ref} isSelect={props.isSelect} />;
}

export default OtherVideo;
