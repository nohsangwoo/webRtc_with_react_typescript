const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  // cors설정도 해줌
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let users = {};

let socketToRoom = [];

io.on('connection', socket => {
  // console.log(socket);
  // 프론트단에서 uuid로 만들어진 roomId를 전달받음

  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
  });

  socket.on('join room', roomID => {
    // 3. 사용자 현황(users) 최신화--------------
    // 4. 만약 users목록에 전달 받은 해당 roomId가 이미 존재한다면
    // 5. FE에서 전달받은 roomId로 usersobj에 해당 roomId가 존재한다면
    // 6. 이미 존재하는 방에 내 고유 socket.io의 키값을 push 해줌
    if (users[roomID]) {
      // 7.해당 방의 총인원을 계산하고
      const length = users[roomID].length;
      // 8. 이때 만약 같은방에 동시에 접속하는 사람수가 2명이상이면 return 시켜버림
      // 9. 혹시 room이 full일때 작동하는 것
      console.log(length, '유저길이 계산');
      // 10. 뱡에 2명이상 참여하지 못하게(방장포함) 제한을 걸어두기위한 설정

      // aleary return  사용자의 길이가 1명을 초과 한다면 바로 리턴시켜서 아무작업도 못하게 해버림
      // 3명째부터는 아무런 동작도 못함
      // if (length > 1) {
      //   socket.emit('is reject');
      //   return;
      // }

      //
      users[roomID].push(socket.id);
      console.log('사용자현황', users);
    } else {
      users[roomID] = [socket.id];
      console.log('사용자현황', users);
    }
    // end of 사용자 현황(users) 최신화--------------

    // 사용자 현황 최신화 후 방에 누가 있는지 현황 추가
    // socket.id가 key : roomId가 value
    socketToRoom.push({ socketId: socket.id, roomId: roomID });
    console.log('socketToRoom: ', socketToRoom);
    // 자기자신의 정보를 제외하고 방안에 존재하는 모든 유저의 방정보를 최신화
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

    socket.emit('all users', usersInThisRoom);
  });

  socket.on('sending signal', payload => {
    // caller의
    io.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on('returning signal', payload => {
    io.to(payload.callerID).emit('receiving returned signal', {
      signal: payload.signal,
      id: socket.id,
    });
  });

  //접속이 끊어질때 행동 뭔가 실시간은 아님
  // disconnect는 기본 기능 사용자가 나가는걸 자동으로 감지해줌
  socket.on('disconnect', () => {
    console.log('사용자가 나갔습니다', socket.id);
    console.log(socketToRoom);
    const found = socketToRoom.find(element => element.socketId === socket.id);

    if (found) {
      console.log('존재하는 유저가 나감');
    }

    socket.broadcast.emit('user left', { leftUserId: socket.id });

    const newSocketToRoom = socketToRoom.filter(element => {
      return element.socketId == socket.id;
    });

    // 나간사용자가 속한 방을 찾음 (roomId)
    const roomID = newSocketToRoom[0]?.roomId;
    // // 찾은 roomId로 사용자 접속현황에서 해당 방에 속한 사람을 최신화
    let room = users[roomID];

    if (room) {
      room = room.filter(id => id !== socket.id);
      users[roomID] = room;
      socketToRoom = socketToRoom.filter(element => {
        return element.socketId !== socket.id;
      });
      if (room.length === 0) {
        delete users[roomID];
      }
      console.error('--------------------------');

      // console.log('asdfasf: ', socketToRoom2);
      console.log('socketToRoom: ', socketToRoom);
      console.log('사용자현황', users);
    }
    //방 최신화 끝
  });
});

http.listen(process.env.PORT || 8000, () =>
  console.log('server is running on port 8000')
);
