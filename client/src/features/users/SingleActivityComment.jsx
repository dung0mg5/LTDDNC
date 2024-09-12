import {Pressable, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import useMoreText from './MoreText';
import MoreText from './MoreText';

export default function SingleActivityComment() {
  return (
    <Pressable
      style={{
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        marginTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        <Text
          style={{
            color: '#666',
            fontWeight: '500',
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
            }}>
            Nguyen Quoc Toan
          </Text>{' '}
          commented on a post
        </Text>

        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 50,
            backgroundColor: '#6C6C6C',
          }}
        />
        <Text
          style={{
            color: '#666',
            fontWeight: '600',
          }}>
          1w
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}>
        <MoreText>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
          voluptas tenetur ducimus, laborum, quos, quas quidem quae quia
          quibusdam Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Harum culpa quam tempore provident quo pariatur autem quos laudantium
          sunt dolorum praesentium voluptatem, est odio dolore eveniet soluta
          molestiae exercitationem delectus?
        </MoreText>
      </View>
    </Pressable>
  );
}
