import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SinglePost from '../features/posts/SinglePost';
import BoxComment from '../features/posts/BoxComment';
import Comments from '../features/posts/Comments';
import {useIsFocused} from '@react-navigation/native';
import {getComments} from '../services/apiPost';

const CommentScreen = ({route}) => {
  const {post} = route.params;
  const [comments, setComments] = useState([]);
  const isFocused = useIsFocused();

  async function fetchComments() {
    const {data} = await getComments({postId: post._id});
    setComments(data.data);
  }

  useEffect(() => {
    if (isFocused) {
      fetchComments();
    }
  }, [isFocused]);
  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <SinglePost post={post} comments={comments} />
        <Comments comments={comments} post={post} />
      </ScrollView>
      <BoxComment comments={comments} onSetComments={setComments} post={post} />
    </>
  );
};

export default CommentScreen;
