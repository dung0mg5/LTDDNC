/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {AnimatePresence, View as MotiView} from 'moti';
import styled from 'styled-components/native';

import CustomButton from './CustomButton';
import BackDrop from './Backdrop';
import items from '../../data/react';
import EmojiItem from './EmojiItem';
import {useNavigation} from '@react-navigation/native';
import {createPost, createReact, getReactsPost} from '../../services/apiPost';
import useLogin from '../authentication/useLogin';
import toast from 'react-hot-toast/headless';

const Root = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-top-width: 1px;
  border-top-color: #e9e9e9;
  height: 60px;
`;

const Column = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-right: 15px;
`;

const StyledImage = styled.Image`
  width: 18px;
  height: 18px;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #666666;
`;

const EmojiBox = styled.View`
  flex-direction: row;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 3px #000;
  padding: 2px 10px;
  gap: 10px;
`;

function ReactBox({post, reacts}) {
  const {profile} = useLogin();
  const [current, setCurrent] = useState(null);
  const [signal, setSignal] = useState(0);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  console.log(post);

  const isReacted = reacts.filter(
    react => react.owner._id === profile.user.authenticatedUser._id,
  );

  async function doReact() {
    const {errorMessage} = await createReact({
      postId: post._id,
      type: current,
      owner: profile.user.authenticatedUser._id,
    });

    if (errorMessage) {
      return toast.error(errorMessage);
    }
  }

  async function doRepost() {
    const formData = new FormData();
    formData.append('content', post.content);
    formData.append('visibility', post.visibility);
    formData.append('commentControl', post.commentControl);

    post.media.url &&
      formData.append('media', {
        uri: post.media.url,
        type: 'image/jpeg | image/png | image/jpg | video/mp4',
        name: `media.${post.media.url.split('.').pop()}`,
      });

    const {errorMessage} = await createPost({
      formData,
    });

    if (errorMessage) {
      return toast.error(errorMessage);
    }

    return toast.success('Repost successfully');
  }

  function handlePressEmoji(index) {
    setShow(false);
    setCurrent(index);
    setSignal(1);
  }

  function handleButtonPress() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
    setCurrent(null);
    setSignal(1);
  }

  function handleGesture(event) {
    const currentItem = Math.floor(event.nativeEvent.x / 60);
    if (currentItem >= 0 && currentItem < items.length) {
      setCurrent(currentItem);
    } else {
      setCurrent(null);
    }
  }

  function handleGestureEnded() {
    setShow(false);
  }

  useEffect(() => {
    if (isReacted.length > 0) {
      setCurrent(isReacted[0].type);
    }
  }, [reacts]);

  useEffect(() => {
    if (current !== null && signal === 1) {
      doReact();
    }
  }, [current]);

  return (
    <Root>
      <AnimatePresence>
        {show && (
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onEnded={handleGestureEnded}>
            <MotiView
              style={styles.container}
              from={{opacity: 0}}
              animate={{opacity: 1}}>
              <MotiView
                style={styles.floatBox}
                from={{translateY: 40, opacity: 0}}
                animate={{translateY: 0, opacity: 1}}
                exit={{translateY: 40, opacity: 0}}
                transition={{duration: 800}}>
                <EmojiBox>
                  {items.slice(0, 3).map((item, index) => (
                    <EmojiItem
                      onPress={() => handlePressEmoji(index)}
                      key={item.title}
                      data={item}
                      index={index}
                      scaled={current === index}
                    />
                  ))}
                </EmojiBox>
              </MotiView>
            </MotiView>
          </PanGestureHandler>
        )}
      </AnimatePresence>

      {show && <BackDrop onPress={handleClose} />}
      <CustomButton
        onLongPress={handleButtonPress}
        onPress={() => {
          handlePressEmoji(3);
          setSignal(1);
        }}
        color={current === null ? '#666666' : items[current].color}
        emoji={current === null ? items[3].emoji : items[current].emoji}
        text={current === null ? 'Like' : items[current].title}
      />

      <Column
        onPress={() =>
          navigation.navigate('comment', {
            post,
          })
        }>
        <StyledImage source={require('../../../assets/icons/comment.png')} />
        <StyledText>Comment</StyledText>
      </Column>
      <Column onPress={doRepost}>
        <StyledImage
          style={{
            width: 25,
            height: 20,
          }}
          source={require('../../../assets/icons/repost.png')}
        />
        <StyledText>Repost</StyledText>
      </Column>
      <Column>
        <StyledImage source={require('../../../assets/icons/send.png')} />
        <StyledText>Send</StyledText>
      </Column>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    height: 180,
    justifyContent: 'center',
    zIndex: 10,
  },

  floatBox: {
    alignItems: 'center',
  },
});

export default ReactBox;
