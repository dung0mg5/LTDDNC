import React from 'react';
import {Dimensions, Pressable} from 'react-native';

function BackDrop({...rest}) {
  return (
    <Pressable
      {...rest}
      style={{
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: -1,
      }}
    />
  );
}

export default BackDrop;
