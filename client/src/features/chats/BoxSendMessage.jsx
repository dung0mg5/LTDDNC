import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {sendMessage} from '../../services/apiChat';
import toast from 'react-hot-toast/headless';
import {useChat} from '../../context/ChatContext';

function BoxSendMessage({socket, onSetMessages, messages}) {
  const [message, setMessage] = useState({
    content: '',
    media: '',
  });
  const {selectedChat} = useChat();

  async function doSendMessage() {
    const formData = new FormData();
    formData.append('content', message.content);
    // message.media &&
    //   formData.append('media', {
    //     uri: post.media,
    //     type: 'image/jpeg | image/png | image/jpg | video/mp4',
    //     name: `media.${post.media.split('.').pop()}`,
    //   });

    const {errorMessage, data} = await sendMessage({
      chatId: selectedChat,
      formData,
    });

    if (errorMessage) {
      return toast.error(errorMessage);
    }

    setMessage({content: '', media: ''});
    socket.emit('new-message', data.data);
    onSetMessages([...messages, data.data]);
  }

  return (
    <View
      style={{
        borderTopColor: '#EAEAEA',
        borderTopWidth: 1,
        marginBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
      <TouchableOpacity>
        <Image
          style={{
            width: 20,
            height: 20,
            marginLeft: 20,
            marginTop: 10,
          }}
          source={require('../../../assets/icons/link.png')}
        />
      </TouchableOpacity>

      <TextInput
        style={{
          marginTop: 10,
          fontSize: 16,
          fontWeight: '700',
          backgroundColor: '#F3F2EF',
          padding: 10,
          borderRadius: 5,
          width: '75%',
        }}
        placeholder="Write a message..."
        placeholderTextColor="#5F6163"
        autoCapitalize="none"
        autoCorrect={false}
        defaultValue={message.content}
        onChangeText={text => setMessage({...message, content: text})}
      />
      {message.content ? (
        <TouchableOpacity onPress={doSendMessage}>
          <Image
            style={{
              marginLeft: 10,
              marginTop: 10,
            }}
            source={require('../../../assets/icons/send-v2.png')}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Image
            style={{
              marginLeft: 10,
              marginTop: 10,
            }}
            source={require('../../../assets/icons/record.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default BoxSendMessage;
