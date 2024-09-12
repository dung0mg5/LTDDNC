import React, {useState} from 'react';
import {View, Text, Modal, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import SingleEmploymentType from './SingleEmploymentType';

const employmentTypes = [
  'Select one',
  'Full-time',
  'Part-time',
  'Freelance',
  'Self-employed',
  'Contract',
  'Internship',
];

const workplaceTypes = [
  ['Select one', ''],
  ['Remote', 'Employees work off-site'],
  ['On-site', 'Employees come to work in-person'],
  ['Hybrid', 'Employees work both on-site and off-site'],
];

const ModalContainer = styled.View`
  flex: ${props => (props.typeModal === 'employmentType' ? 1 : 0.7)};
  align-items: center;
  background-color: #fff;
  border-color: #666;
`;

const ModalEmploymentTypeContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CustomModal = ({isVisible, onClose, onSetData, data, typeModal}) => {
  const [isChecked, setChecked] = useState('Select one');

  function handleCheckboxPress(type) {
    setChecked(type);
  }

  function handleSetData() {
    if (typeModal === 'employmentType') {
      onSetData({
        ...data,
        employmentType: isChecked,
      });
    } else if (typeModal === 'workplaceType') {
      onSetData({
        ...data,
        workplaceType: isChecked[0],
      });
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        onClose();
        setChecked('Select one');
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          onClose();
          handleSetData();
        }}>
        <Overlay />
      </TouchableWithoutFeedback>
      <ModalContainer typeModal={typeModal}>
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
            {typeModal === 'employmentType'
              ? 'What type of job is this?'
              : 'Choose the workplace type'}
          </Text>
          {typeModal === 'employmentType' &&
            employmentTypes.map(type => (
              <SingleEmploymentType
                key={type}
                type={type}
                onHandleCheckBox={handleCheckboxPress}
                checked={isChecked}
                typeModal={typeModal}
              />
            ))}
          {typeModal === 'workplaceType' &&
            workplaceTypes.map(type => (
              <SingleEmploymentType
                key={type}
                type={type}
                onHandleCheckBox={handleCheckboxPress}
                checked={isChecked}
                typeModal={typeModal}
              />
            ))}
        </View>
      </ModalContainer>
    </Modal>
  );
};

const ModalEmploymentType = ({
  modalVisible,
  onCloseModal,
  onSetData,
  data,
  typeModal = 'employmentType',
}) => {
  return (
    <ModalEmploymentTypeContainer>
      <CustomModal
        isVisible={modalVisible}
        onClose={onCloseModal}
        onSetData={onSetData}
        data={data}
        typeModal={typeModal}
      />
    </ModalEmploymentTypeContainer>
  );
};

export default ModalEmploymentType;
