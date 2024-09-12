import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {calculateTimeAgo} from '../../utils/helper';

export default function SingleAppliedUser({appliedUser}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('info-applied-user', {appliedUser})}
      style={{
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
      }}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        source={{
          uri: appliedUser.user.avatar.url,
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
          }}>
          {appliedUser.user.fullName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginTop: 5,
          }}>
          {appliedUser.user.headline}
        </Text>
        <Text
          style={{
            color: '#666',
            fontSize: 16,
            fontWeight: 500,
            marginTop: 5,
          }}>
          {appliedUser.user.location}
        </Text>
        <Text
          style={{
            color: '#666',
            fontSize: 16,
            fontWeight: 500,
            marginTop: 10,
          }}>
          Applied {calculateTimeAgo(appliedUser.user.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
