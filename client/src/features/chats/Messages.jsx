/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, Image, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import SingleMessage from './SingleMessage';
import {useChat} from '../../context/ChatContext';
import {getMessages} from '../../services/apiChat';
import Spinner from '../../ui/Spinner';
import useLogin from '../authentication/useLogin';

function Messages({socket, messages, onSetMessages}) {
  const [isLoading, setIsLoading] = useState(false);
  const {selectedChat, chats} = useChat();
  const {profile} = useLogin();

  const currentChat = chats.find(chat => chat._id === selectedChat);

  async function fetchMessages() {
    setIsLoading(true);
    const {data, errorMessage} = await getMessages({chatId: selectedChat});

    if (errorMessage) return;

    setIsLoading(false);
    onSetMessages(data.data);
    socket.emit('join-chat', currentChat._id);
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message-received', newMessage => {
      console.log('new', newMessage);
      console.log('old', messages);
      onSetMessages([...messages, newMessage]);
    });
  });

  return (
    <ScrollView
      ref={ref => {
        this.scrollView = ref;
      }}
      onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
      {isLoading && <Spinner />}
      <View
        style={{
          marginLeft: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
          }}>
          {currentChat.avatarChat.map(a => (
            <Image
              key={a}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
              source={{uri: a}}
            />
          ))}
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          {currentChat.users.length === 2 ? (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                }}>
                {currentChat.users[0]._id === profile.user.authenticatedUser._id
                  ? currentChat.users[1].fullName
                  : currentChat.users[0].fullName}
              </Text>
              {/* <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 50,
                  backgroundColor: '#6C6C6C',
                }}
              /> */}
              {/* <Text
                style={{
                  color: '#666',
                  fontWeight: 600,
                }}>
                1st
              </Text> */}
            </>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginTop: 5,
                }}>
                {currentChat.nameChat}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#2D64BC',
                    fontSize: 18,
                    fontWeight: 800,
                    marginTop: 5,
                  }}>
                  Invite others to join this chat
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {currentChat.users.length === 2 && (
          <Text
            style={{
              marginTop: 5,
              fontSize: 15,
              color: '#666',
              fontWeight: 600,
            }}>
            {currentChat.users[0]._id === profile.user.authenticatedUser._id
              ? currentChat.users[1].headline
              : currentChat.users[0].headline}
          </Text>
        )}
      </View>
      {messages.map((item, i) => (
        <SingleMessage key={i} index={i} message={item} />
      ))}
    </ScrollView>
  );
}

export default Messages;
