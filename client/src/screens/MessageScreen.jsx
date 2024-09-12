/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import React, {useEffect, useState} from 'react';
import CustomBackIcon from '../ui/CustomBackIcon';
import Messages from '../features/chats/Messages';
import BoxSendMessage from '../features/chats/BoxSendMessage';
import useLogin from '../features/authentication/useLogin';
import {baseUrlApi} from '../constants/baseUrlApi';

import io from 'socket.io-client';
let socket = io(baseUrlApi);

const Header = styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 60px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #eaeaea;
`;

let user;

function HeaderMessage({chat, currentUser}) {
  console.log(chat.users[0]._id, currentUser._id);
  if (chat.users[0]._id === currentUser._id) {
    user = chat.users[1];
  } else {
    user = chat.users[0];
  }

  return (
    <Header>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 15,
        }}>
        <CustomBackIcon
          style={{
            marginLeft: 20,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
          }}>
          {user.fullName}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginRight: 20,
          gap: 40,
        }}>
        <TouchableOpacity>
          <Image source={require('../../assets/icons/dot.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/icons/meeting.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/icons/star.png')} />
        </TouchableOpacity>
      </View>
    </Header>
  );
}

function MessageScreen({route}) {
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const {chat} = route.params;
  const {profile} = useLogin();

  useEffect(() => {
    socket.emit('setup', profile.user.authenticatedUser._id);
    socket.on('connected', () => setSocketConnected(true));
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
      }}>
      <HeaderMessage chat={chat} currentUser={profile.user.authenticatedUser} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Messages
          socket={socket}
          messages={messages}
          onSetMessages={setMessages}
        />
        <BoxSendMessage
          socket={socket}
          onSetMessages={setMessages}
          messages={messages}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export default MessageScreen;
