import React from 'react';
import styled from 'styled-components';
import MyListMainVideo from './MyListMainVideo';
import OtherVideo from './OtherVideo';

const Container = styled.div`
  position: absolute;
  bottom: 5rem;
  right: 0;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 6.5rem;
  z-index: 10;
`;

const OtherVideoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  color: red;
  cursor: pointer;
`;

const VideoListWrapper = ({
  myVideoPlay,
  mainStream,
  peers,
  selectUser,
  selectedUser,
  userVideo,
  peersRef,
}) => {
  return (
    <Container>
      <OtherVideoWrapper onClick={() => myVideoPlay()}>
        <MyListMainVideo mainStream={mainStream} />
      </OtherVideoWrapper>
      {peers.map((peer, index) => {
        return (
          <OtherVideoWrapper
            key={index}
            onClick={() => selectUser(peer, index)}
          >
            <OtherVideo
              key={index}
              peer={peer}
              isSelect={index === selectedUser}
              userVideo={userVideo}
            />
            {/* <OtherVideoText>{`${peersRef.current[index].peerID}`}</OtherVideoText> */}
          </OtherVideoWrapper>
        );
      })}
    </Container>
  );
};

export default VideoListWrapper;
