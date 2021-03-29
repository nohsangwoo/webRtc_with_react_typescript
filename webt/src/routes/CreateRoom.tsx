import React from 'react';
import { v1 as uuid } from 'uuid';

type Props = {
  history: any;
};

const CreateRoom = (props: Props): any => {
  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }

  return <button onClick={create}>Create room</button>;
};

export default CreateRoom;
