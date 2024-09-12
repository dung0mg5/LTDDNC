import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'moti';

export default function SingleNotification({notification}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#EAF2FE',
        padding: 20,
        flexDirection: 'row',
        width: '100%',
      }}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        source={{
          uri: notification.owner.avatar.url,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          marginLeft: 20,
          marginRight: 20,
        }}>
        {notification.content} from {notification.owner.fullName}
      </Text>
    </TouchableOpacity>
  );
}
