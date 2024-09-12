import {TouchableOpacity, View, Text} from 'react-native';
import React from 'react';
import ActivityPost from './ActivityPost';
import ActivityComment from './ActivityComment';

export default function SingleActivityTab({children, onSetIsActive, isActive}) {
  const style =
    isActive === children
      ? {backgroundColor: '#327445', color: '#fff', borderColor: 'transparent'}
      : {backgroundColor: '#fff', color: '#666', borderColor: '#666'};
  const color = isActive === children ? '#fff' : '#666';
  return (
    <View>
      <TouchableOpacity
        disabled={isActive === children}
        onPress={() => onSetIsActive(children)}
        style={{
          marginRight: 10,
          marginBottom: 20,
          borderRadius: 30,
          padding: 10,
          borderWidth: 1,
          ...style,
        }}>
        <Text
          style={{
            color: color,
            fontSize: 20,
            fontWeight: '700',
          }}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
