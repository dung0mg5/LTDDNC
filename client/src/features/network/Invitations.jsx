import {FlatList} from 'react-native';
import React, {useState} from 'react';
import SingleInvitation from './SingleInvitation';

function Invitations({
  invitations,
  onRejectConnection,
  onConfirmConnection,
  onFetchPendingConnection,
  scroll,
}) {
  // const [next, setNext] = useState(1);

  return (
    <FlatList
      style={{
        backgroundColor: '#fff',
        paddingBottom: 20,
      }}
      // onScrollEndDrag={() => {
      //   onFetchPendingConnection(next);
      //   setNext(prev => prev + 1);
      // }}
      scrollEnabled={scroll}
      data={invitations}
      renderItem={({item}) => (
        <SingleInvitation
          invitation={item}
          onRejectConnection={onRejectConnection}
          onConfirmConnection={onConfirmConnection}
        />
      )}
    />
  );
}

export default Invitations;
