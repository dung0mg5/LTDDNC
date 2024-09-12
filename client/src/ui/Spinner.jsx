import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Spinner = () => {
  return (
    <View>
      <Modal transparent={true} animationType="slide" visible={true}>
        <Overlay>
          <ActivityIndicator size="large" color="#fff" />
        </Overlay>
      </Modal>
    </View>
  );
};

export default Spinner;
