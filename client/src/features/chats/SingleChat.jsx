import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useChat} from '../../context/ChatContext';
import {formatTime} from '../../utils/helper';

function SingleChat({chat}) {
  const navigation = useNavigation();
  const {setSelectedChat} = useChat();

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedChat(chat._id);
        navigation.navigate('message', {chat});
      }}
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingTop: 8,
        gap: 10,
      }}>
      {chat.avatarChat.length === 1 && (
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: '#EAEAEA',
          }}
          source={{uri: chat.avatarChat[0]}}
        />
      )}
      {chat.avatarChat.length === 2 && (
        <View
          style={{
            width: 50,
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#EAEAEA',
            }}
            source={{uri: chat.avatarChat[0]}}
          />
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#EAEAEA',
              position: 'absolute',
              left: 18,
              top: 13,
            }}
            source={{uri: chat.avatarChat[1]}}
          />
        </View>
      )}
      {chat.avatarChat.length > 2 && (
        <View
          style={{
            width: 50,
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#EAEAEA',
            }}
            source={{uri: chat.avatarChat[0]}}
          />
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#EAEAEA',
              position: 'absolute',
              left: 21,
              top: 0,
            }}
            source={{uri: chat.avatarChat[1]}}
          />
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#EAEAEA',
              position: 'absolute',
              left: 12,
              top: 22,
            }}
            source={{uri: chat.avatarChat[2]}}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: '#EAEAEA',
          borderBottomWidth: 1,
          paddingBottom: 30,
          width: '85%',
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <Text style={{fontSize: 18, fontWeight: 700}}>{chat.nameChat}</Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#666',
              marginTop: 5,
            }}>
            {chat.latestMessage?.content}
          </Text>
        </View>
        {chat.latestMessage?.createdAt && (
          <Text
            style={{
              color: '#666',
              fontWeight: 600,
            }}>
            {formatTime(chat.latestMessage.createdAt).toLowerCase()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default SingleChat;
