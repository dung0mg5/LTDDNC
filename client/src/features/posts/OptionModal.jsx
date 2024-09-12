import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Column = styled.View`
  flex-direction: column;
  gap: 5px;
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

const OptionModal = ({option, onHandleCheckBox, checked}) => {
  return (
    <Pressable
      style={{
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
      }}>
      <Row
        style={{
          justifyContent: 'space-between',
        }}>
        <Row>
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
              source={option.icon}
            />
          </View>
          <Column>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: '#000',
              }}>
              {option.title}
            </Text>
            {option.note && (
              <Text
                style={{
                  color: '#666',
                  fontWeight: 700,
                }}>
                {option.note}
              </Text>
            )}
          </Column>
        </Row>

        <CheckBoxContainer onPress={() => onHandleCheckBox(option.title)}>
          <CheckBox
            style={{
              borderColor: checked === option.title ? 'green' : 'gray',
              backgroundColor:
                checked === option.title ? 'green' : 'transparent',
            }}>
            {checked === option.title && <InnerCircle />}
          </CheckBox>
        </CheckBoxContainer>
      </Row>
    </Pressable>
  );
};

export default OptionModal;
