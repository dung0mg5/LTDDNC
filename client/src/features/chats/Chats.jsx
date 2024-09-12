/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList} from 'react-native';
import React, {useEffect} from 'react';
import SingleChat from './SingleChat';
import {useChat} from '../../context/ChatContext';
import Spinner from '../../ui/Spinner';
import {useIsFocused} from '@react-navigation/native';

function Chats() {
  const {chats, isLoading, fetchChats} = useChat();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchChats();
    }
  }, [isFocused]);

  return (
    <>
      {isLoading && <Spinner />}
      <FlatList
        data={chats}
        renderItem={({item}) => <SingleChat chat={item} />}
      />
    </>
  );
}

export default Chats;
