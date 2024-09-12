import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import OptionModal from './OptionModal';

const optionsVisiblePost = [
  {
    title: 'Anyone',
    icon: require('../../../assets/icons/earth.png'),
    note: 'Anyone on or off SocialJob',
  },
  {
    title: 'Connections only',
    icon: require('../../../assets/icons/network.png'),
  },
  {
    title: 'No one',
    icon: require('../../../assets/icons/no-comment.png'),
  },
];

const ModalContainer = styled.View`
  align-items: center;
  background-color: #fff;
  border-color: #666;
  height: 350px;
`;

const ModalCommentControlContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CustomModal = ({isVisible, onClose, onSetData, data}) => {
  const [isChecked, setChecked] = useState('Anyone');

  function handleCheckboxPress(type) {
    setChecked(type);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback
        onPress={() => {
          onClose();
          onSetData({...data, commentControl: isChecked});
        }}>
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
        <View
          style={{
            marginTop: 30,
            width: '100%',
            height: '100%',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginLeft: 20,
              marginBottom: 20,
            }}>
            Comment control
          </Text>
          {optionsVisiblePost.map((option, index) => (
            <OptionModal
              key={index}
              option={option}
              onHandleCheckBox={handleCheckboxPress}
              checked={isChecked}
            />
          ))}
        </View>
      </ModalContainer>
    </Modal>
  );
};

export default function ModalCommentControl({
  modalVisible,
  onCloseModal,
  onSetData,
  data,
}) {
  return (
    <ModalCommentControlContainer>
      <CustomModal
        isVisible={modalVisible}
        onClose={onCloseModal}
        onSetData={onSetData}
        data={data}
      />
    </ModalCommentControlContainer>
  );
}
