import React, {useState} from 'react';
import {View, Text, Modal, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';

const employmentTypes = [
  'Select one',
  'Full-time',
  'Part-time',
  'Freelance',
  'Self-employed',
  'Contract',
  'Internship',
];

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
  border-color: #666;
`;

const ModalEmploymentTypeContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CustomModal = ({isVisible, onClose, onSetData, data}) => {
  const [isChecked, setChecked] = useState('Select one');

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
          onSetData({...data, employmentType: isChecked});
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
            What type of job is this?
          </Text>
          {employmentTypes.map(type => (
            <SingleEmploymentType
              key={type}
              type={type}
              onHandleCheckBox={handleCheckboxPress}
              checked={isChecked}
            />
          ))}
        </View>
      </ModalContainer>
    </Modal>
  );
};

const ModalSelect = ({modalVisible, onCloseModal, onSetData, data}) => {
  return (
    <ModalEmploymentTypeContainer>
      <CustomModal
        isVisible={modalVisible}
        onClose={onCloseModal}
        onSetData={onSetData}
        data={data}
      />
    </ModalEmploymentTypeContainer>
  );
};

export default ModalSelect;
