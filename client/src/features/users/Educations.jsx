import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SingleEducation from './SingleEducation';

export default function Educations({data}) {
  return (
    <>
      <FlatList
        style={{
          marginLeft: 20,
          marginRight: 20,
        }}
        data={data}
        renderItem={({item}) => <SingleEducation item={item} />}
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
          Show all educations
        </Text>
        <Image source={require('../../../assets/icons/next.png')} />
      </TouchableOpacity>
    </>
  );
}
