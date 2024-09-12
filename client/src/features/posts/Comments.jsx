import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SingleComment from './SingleComment';

function Comments({comments, post}) {
  return (
    <View>
      <Text
        style={{
          fontSize: 19,
          fontWeight: 'bold',
          marginHorizontal: 20,
          marginVertical: 10,
          color: '#666',
        }}>
        Comments
      </Text>
      {comments.map(item => (
        <SingleComment key={item._id} comment={item} post={post} />
      ))}
    </View>
  );
}

export default Comments;
