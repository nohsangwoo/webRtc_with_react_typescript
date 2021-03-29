import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';
import OtherVideo from './components/OtherVideo';
import LoadingAni from '../../components/LoadingAni';

const Container = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
`;

const BackgrounVideoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

//91 67
const TopWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid red;
  z-index: 10;
  width: 100%;
  height: 67px;
  /* display: flex; */
  background-color: #f0f0f0;
  display: grid;
  /* grid-template-columns: 1fr; */
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

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Bar2 = styled.div`
  width: 35px;
  height: 5px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
`;

const RoomContainer = props => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.roomID;
  const [loading, setLoading] = useState(true);
  const [, forceRerender] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [leftUserId, setLeftUserId] = useState();
  useEffect(() => {
    let cleanUp = false;
    if (!cleanUp) {
      try {
        // 서버로 연결하는 주소 for socekt.io
        socketRef.current = io.connect('http://localhost:8000');

        (async function getStream() {
          // 접속한 사용자의 영상을 받아와서 stream에 넣어두고 제어함
          const stream = await navigator.mediaDevices.getUserMedia({
            video: videoConstraints,
            audio: true,
          });
          // 1. props로 전달받은 roomId를 "join room"이란 트리거를 이용하여 BE로 전달
          // 2. caller, answer 공통적으로 작동하는 부분
          socketRef.current.emit('join room', roomID);
          socketRef.current.on('all users', users => {
            // 서버에서 최신화된 현재 방의 참여자 수와 정보를 받아온다(나 자신은 제외함)
            console.log('allusers', users);
            const peers = [];
            // 서버에서 받아온 유저만큼 반복하는데
            users.forEach(userID => {
              // 이때 peer를 새로 생성해준다
              // 전달받은 유저중 한명의 아이디, 방주인의 아이디, 방주인의 stream정보를 createPeer로전달
              const peer = createPeer(userID, socketRef.current.id, stream);
              // 생성된 피어는 peersRef에는 userId와 peer정보를 오브젝트 형태로 push 하고
              peersRef.current.push({
                peerID: userID,
                peer,
              });
              // peers라는 빈배열에 push 한다
              peers.push(peer);
            });
            // Peers라는 함수 스코프 변수에  peer가 다 push 됐다면
            // 해당 peer내용을 peers useState에 set해준다
            setPeers(peers);
            // 위 과정이 끝나면 로딩이 끝났음을 의미하는 loading state를 false로 set해주고
            setLoading(false);
            // 내 영상을 화면에 출력하기위하여 srcObject의 소스를 내 영상의 stream으로 지정해준다
            userVideo.current.srcObject = stream;
          });

          // 두번째 유저로부터 발동하는데!
          // 특정 유저만 타게팅해서 전달한 내용임
          // 귓속말 같은느낌으로다가 payload를 전달받는데
          // 새로 접속한 유저의 시그널 정보와 방주인의 아이디를 전달 받는다
          socketRef.current.on('user joined', payload => {
            // 전달받은 새로 접속한 유저의 시그널 정보와 방주인의 아이디를 가지고
            // 피어를 추가해준다
            // 마지막의 stream데이터는
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });
            setPeers(users => [...users, peer]);
          });

          // 이건 방의 주인만 받는 트리거
          // 귓속말 받아서 최근에 접속한 사람의 시그널 요청을 수락한 각 peer의 상태를 최신화 하는 작업
          socketRef.current.on('receiving returned signal', payload => {
            // 접속한 모든 방의 유저중 전달 받은 아이디를(귓속말 을 받은 사람의 아이디) 찾아서
            const item = peersRef.current.find(p => p.peerID === payload.id);
            // 해당 아이디로 시그널링을 다시! 연결함
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
    // eslint-disable-next-line
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
  // 전달받은 유저중 한명의 아이디, 방주인의 아이디, 방주인의 stream정보를 createPeer로전달
  function createPeer(userToSignal, callerID, stream) {
    // 전달받은 정보로 peer객체 생성
    const peer = new Peer({
      //
      initiator: true,
      trickle: false,
      stream,
    });

    // 방주인의 피어를 생성한다음

    //방에 참여하는 사람들에게 서 signal 연결이 들어오길 대기중
    // 즉 첫번째로 방 만든 유저는 대기하고있고
    // 두번째로 방에 참여한 사람부터 해당 sending signal 트리거가 작동함

    // 다른 유저중 한명의 아이디, 방주인의 아이디, 내 시그널정보
    peer.on('signal', signal => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  // 새로운 접속자가 있을때 기존에 있던 방참여자의 peer 최신화를 위한 작업임
  // 가장 최근에 접속한 사람은 createPeer로 한방에 끝나지만
  // 기존 접속한 유저들은 새로 접속한 유저의 Peer를 별도로 추가해주는 작업
  // incomingSignal: 시그널 연결을 귓속말로 요청하는 자의 시그널 정보
  // 방주인의 아이디
  // stream은 귓속말 받은 사람의 stream
  function addPeer(incomingSignal, callerID, stream) {
    //귓속말 받은 사람의 피어생성
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    // 전달받은 정보로 peer 생성 후

    // peer가 생성되면 peer.on("signal")은 자동으로 시작됨
    peer.on('signal', signal => {
      // 귓속말을 전달받은 사람의 시그널 정보와 방주인의 아이디를 담아
      // 서버로 returning signal 트리거 작동
      // 귓속말 받은 사람의 시그널과 방주인아이디를 전달
      //이거 최신화 인듯
      // 귓속말 받은사람의 최신화된 Peer상태를 다시 방장에게 보내서 최신화 시키는 작업

      socketRef.current.emit('returning signal', { signal, callerID });
    });

    // 실제로 시그널을 연결 하는 코드
    // 위 트리거는 트리거대로 작동하고 귓속말을 전달 받은 사람과 방주인에게 시그널을 연결해달라고 요청 및 수락
    // 즉 귓속말 받은 사람이 귓속말 보낸사람과의 시그널링 연결을 수락하는 과정
    peer.signal(incomingSignal);

    return peer;
  }

  // 나를 제외한 방에 입장한 모든 유저의 peer정보들이 담김
  console.log('peers 현황', peers);
  return (
    <Container>
      <TopWrapper>asdasd</TopWrapper>
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
    </Container>
  );
};

export default RoomContainer;
