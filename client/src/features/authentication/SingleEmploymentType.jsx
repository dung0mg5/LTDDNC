import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

const ModalText = styled.Text`
  color: #666;
  font-size: 20px;
  font-weight: 700;
`;

const CheckBoxContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const CheckBox = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const InnerCircle = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #fff;
  position: absolute;
`;

function SingleEmploymentType({type, onHandleCheckBox, checked, typeModal}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        {typeModal === 'employmentType' && <ModalText>{type}</ModalText>}
        {typeModal === 'workplaceType' && <ModalText>{type[0]}</ModalText>}
        {typeModal === 'workplaceType' && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: '#666',
            }}>
            {type[1]}
          </Text>
        )}
      </View>
      <View>
        <CheckBoxContainer onPress={() => onHandleCheckBox(type)}>
          <CheckBox
            style={{
              borderColor: checked === type ? 'green' : 'gray',
              backgroundColor: checked === type ? 'green' : 'transparent',
            }}>
            {checked === type && <InnerCircle />}
          </CheckBox>
        </CheckBoxContainer>
      </View>
    </View>
  );
}

export default SingleEmploymentType;
