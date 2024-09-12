import React from 'react';
import {useEffect, useRef} from 'react';
import {View, Animated, StatusBar, Image} from 'react-native';
import toast, {useToaster} from 'react-hot-toast/headless'; // Import should be from "react-hot-toast/headless", which isn't supported in Expo Snack
import styled from 'styled-components/native';

const ContainerToast = styled.View`
  height: 60px;
  width: 100%;
  background-color: #fff;
  margin-top: ${StatusBar.currentHeight + 70}px;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
`;

const StyledText = styled.Text`
  color: #000;
  font-size: 14px;
  font-weight: 600;
  margin-left: 10px;
  width: 90%;
`;

const Toast = ({t, updateHeight, offset}) => {
  // Animations for enter and exit
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  const posAnim = useRef(new Animated.Value(-80)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: t.visible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim, t.visible]);

  useEffect(() => {
    Animated.spring(posAnim, {
      toValue: t.visible ? offset : -80,
      useNativeDriver: false,
    }).start();
  }, [posAnim, offset, t.visible]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: t.visible ? 9999 : undefined,
        alignItems: 'center',
        opacity: fadeAnim,
        transform: [
          {
            translateY: posAnim,
          },
        ],
      }}>
      <ContainerToast
        onLayout={event => updateHeight(event.nativeEvent.layout.height)}
        key={t.id}>
        {t.type === 'success' && (
          <Image
            source={require('../../assets/images/success.png')}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        {t.type === 'error' && (
          <Image
            source={require('../../assets/images/error.png')}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}

        <StyledText>{t.message}</StyledText>
      </ContainerToast>
    </Animated.View>
  );
};

export default function Notifications() {
  const {toasts, handlers} = useToaster();
  const {startPause, endPause} = handlers;
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}>
      {toasts.map(t => (
        <Toast
          key={t.id}
          t={t}
          updateHeight={height => handlers.updateHeight(t.id, height)}
          offset={handlers.calculateOffset(t, {
            reverseOrder: false,
          })}
        />
      ))}
    </View>
  );
}
