/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {AnimatePresence, View as MotiView, useAnimationState} from 'moti';
import styled from 'styled-components/native';

const Root = styled.Pressable`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  text-transform: capitalize;
  font-size: 13px;
  color: #fff;
  text-align: center;
  font-weight: 700;
`;

export default function EmojiItem({data, index, scaled, ...rest}) {
  const animatedState = useAnimationState({
    scaleIn: {scale: 1.2},
    scaleOut: {scale: 1},
  });

  useEffect(() => {
    animatedState.transitionTo(scaled ? 'scaleIn' : 'scaleOut');
  }, [scaled]);

  return (
    <Root {...rest}>
      <AnimatePresence exitBeforeEnter>
        {scaled && (
          <MotiView
            style={styles.titleBox}
            from={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}>
            <Title>{data.title}</Title>
          </MotiView>
        )}
      </AnimatePresence>

      <MotiView
        from={{transform: [{translateY: 40}, {scale: 1}]}}
        animate={{transform: [{translateY: 0}, {scale: 1}]}}
        exit={{transform: [{translateY: 40}, {scale: ((1 / 6) * index) / 10}]}}
        transition={{delay: (index + 1) * 50}}>
        <MotiView state={animatedState}>
          <Image source={data.emoji} />
        </MotiView>
      </MotiView>
    </Root>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    position: 'absolute',
    backgroundColor: '#000',
    top: -50,
    width: 60,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
});
