import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SingleExperience from './SingleExperience';

export default function Experiences({data}) {
  return (
    <>
      <FlatList
        style={{
          marginLeft: 20,
          marginRight: 20,
        }}
        data={data}
        renderItem={({item}) => <SingleExperience item={item} />}
        scrollEnabled={false}
      />
      <TouchableOpacity
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#666',
          }}>
          Show all experiences
        </Text>
        <Image source={require('../../../assets/icons/next.png')} />
      </TouchableOpacity>
    </>
  );
}
