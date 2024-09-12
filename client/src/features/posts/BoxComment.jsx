import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import useLogin from '../authentication/useLogin';
import {createComment} from '../../services/apiPost';
import toast from 'react-hot-toast/headless';

function BoxComment({comments, onSetComments, post}) {
  const {profile} = useLogin();
  const [comment, setComment] = useState('');

  async function doComment() {
    const {data, errorMessage} = await createComment({
      content: comment,
      postId: post._id,
    });

    if (errorMessage) return toast.error(errorMessage);

    onSetComments([data.data, ...comments]);
    setComment('');
  }

  return (
    <KeyboardAvoidingView
      style={{
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        shadowColorTop: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 100,
        backgroundColor: '#fff',
        width: '100%',
        zIndex: 100,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 10,
            gap: 8,
          }}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#EAEAEA',
            }}
            source={{uri: profile.user.authenticatedUser.avatar.url}}
          />
          <TextInput
            style={{
              fontSize: 16,
              fontWeight: '700',
              width: '75%',
            }}
            placeholder="Leave your thoughts here..."
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoCorrect={false}
            defaultValue={comment}
            onChangeText={setComment}
          />
        </View>
        <TouchableOpacity onPress={doComment}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '800',
              color: comment ? '#2D64BC' : '#bbb',
              marginRight: 20,
              marginTop: 10,
            }}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default BoxComment;
