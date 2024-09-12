import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {removeConnection} from '../../services/apiNetwork';

const ModalContainer = styled.View`
  align-items: center;
  background-color: #fff;
  border-color: #666;
  height: 150px;
`;

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

function ModalRemoveConnection({onCloseModal, onRemoveConnection}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={onCloseModal}>
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <Overlay />
      </TouchableWithoutFeedback>
      <ModalContainer>
        <View
          style={{
            width: 80,
            backgroundColor: '#666',
            height: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        />
        <TouchableOpacity
          onPress={onRemoveConnection}
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginLeft: 20,
            marginTop: 20,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#EAEAEA',
            }}>
            <Image
              style={{
                tintColor: '#666666',
              }}
              source={require('../../..//assets/icons/remove-connection.png')}
            />
          </View>
          <Text
            style={{
              color: '#666666',
              fontSize: 18,
              fontWeight: '800',
            }}>
            Remove connection
          </Text>
        </TouchableOpacity>
      </ModalContainer>
    </Modal>
  );
}

export default ModalRemoveConnection;
