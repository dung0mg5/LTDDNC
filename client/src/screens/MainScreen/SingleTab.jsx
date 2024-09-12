import {Image, Text, View} from 'react-native';
import React from 'react';
import icons from '../../data/icon';

const SingleTab = ({size, color, type, selected}) => {
  const icon = icons.find(i => i.id === type);
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 50,
        gap: 5,
        borderTopWidth: selected ? 2 : 0,
      }}>
      <Image
        source={icon.image}
        style={{
          tintColor: color,
          marginTop: 20,
        }}
      />
      <Text
        style={{
          color: color,
          fontWeight: '500',
        }}>
        {icon.title}
      </Text>
    </View>
  );
};

export default SingleTab;
