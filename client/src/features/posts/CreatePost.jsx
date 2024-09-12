import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import ModalVisiblePost from './ModalVisiblePost';
import ModalCommentControl from './ModalCommentControl';
import {launchImageLibrary} from 'react-native-image-picker';
import Spinner from '../../ui/Spinner';
import {createPost} from '../../services/apiPost';
import toast from 'react-hot-toast/headless';
import useLogin from '../authentication/useLogin';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Row = styled.View`
  margin-left: 20px;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

function Header({disabledPost, onOpenModal, post, onUploadPost}) {
  const {profile} = useLogin();
  const navigation = useNavigation();

  return (
    <Container>
      <Row>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/icons/close.png')} />
        </TouchableWithoutFeedback>
        <Image
          style={{
            borderWidth: 1,
            borderColor: '#e9e9e9',
            borderRadius: 60,
            overflow: 'hidden',
            width: 40,
            height: 40,
          }}
          source={{uri: profile?.user.authenticatedUser.avatar.url}}
        />
        <TouchableOpacity
          onPress={onOpenModal}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: '#696969',
            }}>
            {post.visibility}
          </Text>
          <Image
            style={{
              width: 10,
              height: 6,
              tintColor: '#696969',
            }}
            source={require('../../../assets/images/vector.png')}
          />
        </TouchableOpacity>
      </Row>
      <TouchableOpacity
        disabled={disabledPost}
        onPress={onUploadPost}
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
          borderWidth: 1,
          borderColor: disabledPost && '#EAEAEA',
          backgroundColor: disabledPost ? '#EAEAEA' : '#2D64BC',
          borderRadius: 25,
          marginRight: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: disabledPost ? '#a4a4a4' : '#fff',
          }}>
          Post
        </Text>
      </TouchableOpacity>
    </Container>
  );
}

function CreatePost({navigation}) {
  const [disabledPost, setDisabledPost] = useState(true);
  const [modalVisiblePost, setModalVisiblePost] = useState(false);
  const [modalCommentControl, setModalCommentControl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({
    content: '',
    media: '',
    visibility: 'Anyone',
    commentControl: 'Anyone',
  });

  function handleChangeText(text) {
    setPost({...post, content: text});
  }

  function handleUploadImage() {
    launchImageLibrary(
      {
        storageOptions: {
          path: 'image',
        },
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setPost({...post, media: res.assets[0].uri});
      },
    );
  }

  async function uploadPost() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('content', post.content);
    formData.append('visibility', post.visibility);
    formData.append('commentControl', post.commentControl);
    post.media &&
      formData.append('media', {
        uri: post.media,
        type: 'image/jpeg | image/png | image/jpg | video/mp4',
        name: `media.${post.media.split('.').pop()}`,
      });

    const {errorMessage} = await createPost({
      formData,
    });
    setIsLoading(false);

    if (errorMessage) {
      return toast.error(errorMessage);
    }

    return navigation.navigate('main');
  }

  useEffect(() => {
    if (post.content.length > 0) {
      setDisabledPost(false);
    } else {
      setDisabledPost(true);
    }
  }, [post.content]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {isLoading && <Spinner />}
      <ModalVisiblePost
        onCloseModal={() => setModalVisiblePost(false)}
        modalVisible={modalVisiblePost}
        onSetData={setPost}
        data={post}
        onOpenCommentControlModal={() => setModalCommentControl(true)}
      />
      <ModalCommentControl
        onCloseModal={() => setModalCommentControl(false)}
        modalVisible={modalCommentControl}
        onSetData={setPost}
        data={post}
      />
      <Header
        disabledPost={disabledPost}
        onOpenModal={() => setModalVisiblePost(true)}
        post={post}
        onUploadPost={uploadPost}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          height: '100%',
          marginLeft: 20,
          marginRight: 20,
          flexDirection: 'column',
        }}>
        <TextInput
          multiline={true}
          style={{
            fontSize: 20,
            color: '#000',
            fontWeight: '600',
            height: '90%',
            paddingTop: 20,
          }}
          placeholder="Share your thoughts..."
          placeholderTextColor="#666"
          onChangeText={text => handleChangeText(text)}
        />
        <TouchableOpacity style={{marginLeft: 30}} onPress={handleUploadImage}>
          <Image
            style={{
              width: 25,
              height: 20,
            }}
            source={require('../../../assets/icons/file.png')}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CreatePost;
