import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {calculateTimeAgo} from '../../utils/helper';

const SingleConnection = ({connection, onOpenModal}) => {
  return (
    <View
      style={{
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#e9e9e9',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: connection.user.avatar.url}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: '#e9e9e9',
              overflow: 'hidden',
              marginRight: 10,
              marginLeft: 10,
            }}
          />
          <View
            style={{
              width: 160,
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
              }}>
              {connection.user.fullName}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
              }}>
              {connection.user.experiences[0].headline}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666666',
                fontWeight: '500',
                marginTop: 5,
              }}>
              {`Sent ${calculateTimeAgo(connection?.createdAt)}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onOpenModal}>
            <Image source={require('../../../assets/icons/dot.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#2D64BC',
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 30,
              marginRight: 10,
            }}>
            <Text
              style={{
                color: '#2D64BC',
                fontWeight: '800',
                fontSize: 18,
              }}>
              Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SingleConnection;
