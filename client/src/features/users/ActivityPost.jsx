import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SingleActivityPost from './SingleActivityPost';

const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

export default function ActivityPost({posts}) {
  return (
    <FlatList
      data={[1, 2]}
      renderItem={({item}) => <SingleActivityPost post={item} />}
      scrollEnabled={false}
      style={{
        marginLeft: 20,
        marginRight: 20,
      }}
    />
  );
}
