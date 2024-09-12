import {FlatList} from 'react-native';
import React from 'react';
import SingleActivityComment from './SingleActivityComment';

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

export default function ActivityComment() {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <SingleActivityComment item={item} />}
      scrollEnabled={false}
      style={{
        marginLeft: 20,
        marginRight: 20,
      }}
    />
  );
}
