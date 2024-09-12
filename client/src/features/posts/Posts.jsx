/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import SinglePost from './SinglePost';
import {getFollowingUserPosts} from '../../services/apiPost';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPosts() {
    setIsLoading(true);
    const {data} = await getFollowingUserPosts({page: page, limit: 5});

    setPosts(prevPosts => prevPosts.concat(data.data));
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, [page]);

  function handleLoadMore() {
    setPage(page + 1);
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      <FlatList
        style={{
          height: '100%',
        }}
        data={posts}
        renderItem={({item}) => <SinglePost post={item} />}
        ListFooterComponent={() =>
          isLoading ? (
            <View
              style={{
                marginTop: 10,
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : null
        }
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

export default Posts;
