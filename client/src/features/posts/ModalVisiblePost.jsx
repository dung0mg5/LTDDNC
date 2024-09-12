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
];

const ModalContainer = styled.View`
  align-items: center;
  background-color: #fff;
  border-color: #666;
  height: 350px;
`;

const ModalVisiblePostContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CustomModal = ({
  isVisible,
  onClose,
  onSetData,
  data,
  onOpenCommentControlModal,
}) => {
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
          onSetData({...data, visibility: isChecked});
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
            Who can see your post?
          </Text>
          {optionsVisiblePost.map((option, index) => (
            <OptionModal
              key={index}
              option={option}
              onHandleCheckBox={handleCheckboxPress}
              checked={isChecked}
            />
          ))}

          <TouchableOpacity
            onPress={() => {
              onOpenCommentControlModal();
              onClose();
              onSetData({...data, visible: isChecked});
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: 20,
              marginRight: 30,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Comment control
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#666',
                  fontWeight: '600',
                }}>
                Anyone
              </Text>
            </View>
            <Image source={require('../../../assets/icons/next.png')} />
          </TouchableOpacity>
        </View>
      </ModalContainer>
    </Modal>
  );
};

export default function ModalVisiblePost({
  modalVisible,
  onCloseModal,
  onOpenCommentControlModal,
  onSetData,
  data,
}) {
  return (
    <ModalVisiblePostContainer>
      <CustomModal
        isVisible={modalVisible}
        onClose={onCloseModal}
        onSetData={onSetData}
        onOpenCommentControlModal={onOpenCommentControlModal}
        data={data}
      />
    </ModalVisiblePostContainer>
  );
}
