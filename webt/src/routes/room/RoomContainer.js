import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';
import OtherVideo from './components/OtherVideo';
import LoadingAni from '../../components/LoadingAni';

const Container = styled.div`
  /* display: grid; */
  width: 100vw;
  height: 100vh;
`;

const BackgrounVideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid blue;
`;

const MyVideo = styled.video`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const VideoListWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  right: 0;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100px;
  z-index: 10;
  overflow-x: auto;
`;
// const OotherVideo = styled.video`
//   border: 2px solid black;
//   object-fit: cover;
//   height: 100%;
//   width: 70px;
//   margin: 0 5px;
//   &:hover {
//     border: 2px solid blue;
//   }
// `;

const CurrentTest = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid red;
`;

const ExceededMessage = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  border: 1px solid red;
`;

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const RoomContainer = props => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.roomID;
  const [isExceeded, setIsExceeded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, forceRerender] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [leftUserId, setLeftUserId] = useState();
  useEffect(() => {
    let cleanUp = false;
    if (!cleanUp) {
      try {
        socketRef.current = io.connect('http://localhost:8000');

        socketRef.current.on('is reject', () => {
          setLoading(false);
          setIsExceeded(true);
          console.error('2명이상 입장불가!');
        });

        (async function getStream() {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: videoConstraints,
            audio: true,
          });
          // 1. props로 전달받은 roomId를 "join room"이란 트리거를 이용하여 BE로 전달
          // 2. caller, answer 공통적으로 작동하는 부분
          socketRef.current.emit('join room', roomID);
          socketRef.current.on('all users', users => {
            console.log('allusers', users);
            const peers = [];
            users.forEach(userID => {
              const peer = createPeer(userID, socketRef.current.id, stream);
              peersRef.current.push({
                peerID: userID,
                peer,
              });
              peers.push(peer);
            });
            setPeers(peers);
            setLoading(false);
            userVideo.current.srcObject = stream;
          });

          socketRef.current.on('user joined', payload => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });
            setPeers(users => [...users, peer]);
          });

          socketRef.current.on('receiving returned signal', payload => {
            const item = peersRef.current.find(p => p.peerID === payload.id);
            item.peer.signal(payload.signal);
          });
        })();
      } catch (e) {
        console.log('errorText:', e);
      }
    }

    return () => {
      cleanUp = true;
    };
  }, []);

  useEffect(() => {
    let cleanUp = false;
    if (!cleanUp) {
      socketRef.current.on('user left', ({ leftUserId }) => {
        //for disconnect
        setLeftUserId(leftUserId);

        // find index
        const findPeersRefIndex = peersRef.current.findIndex(peerObj => {
          return peerObj.peerID === leftUserId;
        });

        // early return
        if (findPeersRefIndex === -1) {
          return;
        }
        // real disconnect peer
        peersRef.current[findPeersRefIndex].peer.destroy();

        setIsDelete(true);
      });
    }

    return () => {
      cleanUp = false;
    };
    // eslint-disable-next-line
  }, [
    socketRef,
    peers,
    peersRef.current,
    setLeftUserId,
    isDelete,
    setIsDelete,
  ]);
  //-----------------------------
  useEffect(() => {
    if (isDelete) {
      const findPeersRefIndex = peersRef.current.findIndex(peerObj => {
        return peerObj.peerID === leftUserId;
      });

      // peersRef.current[findPeersRefIndex].peer.destroy();
      peersRef.current.splice(findPeersRefIndex, 1);
      peers.splice(findPeersRefIndex, 1);
      setIsDelete(false);
    }
    // eslint-disable-next-line
  }, [
    peers,
    peersRef.current,
    leftUserId,
    setLeftUserId,
    isDelete,
    setIsDelete,
    forceRerender,
  ]);

  // console.log('peer현황', peers);
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      console.log(`caller's signal sending`);
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      console.log(`answer's signal sending`);

      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  console.log('peers 현황', peers);
  // 나를 제외한 상대방이 peer정보들이 담김
  // 현재 나간 상대의 peer가 사라지지 않는 에러가 있음
  return (
    <Container>
      {loading ? (
        <LoadingAni />
      ) : (
        <BackgrounVideoWrapper>
          <MyVideo muted ref={userVideo} autoPlay playsInline />

          {/* peer를 map돌려서 전달한다음 peer.on("steam",....)진행해줌 */}
          <VideoListWrapper>
            {peers.map((peer, index) => {
              return <OtherVideo key={index} peer={peer} />;
            })}
          </VideoListWrapper>
          {/* {peersRef.current.map((ele, index) => {
            return (
              <CurrentTest
                key={index}
              >{`haha: ${index} and ${ele.peerID}`}</CurrentTest>
            );
          })} */}
        </BackgrounVideoWrapper>
      )}
      {isExceeded ? (
        <ExceededMessage>인원이 초과하였습니다</ExceededMessage>
      ) : (
        ''
      )}
    </Container>
  );
};

export default RoomContainer;
