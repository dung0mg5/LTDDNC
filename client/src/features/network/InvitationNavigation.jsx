import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  overflow: hidden;
  width: 100px;
  background-color: ${props => (props.isActive ? '#337447' : '#EBEBEB')};
`;

const StyledText = styled.Text`
  text-align: center;
  padding: 8px 0px;
  color: ${props => (props.isActive ? '#FFFFFF' : '#666666')};
  font-weight: 700;
  font-size: 16px;
`;

const InvitationNavigation = ({onSetType}) => {
  const [isActive, setIsActive] = useState('Received');

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Button
        onPress={() => {
          setIsActive('Received');
          onSetType('Received');
        }}
        isActive={isActive === 'Received'}
        style={{
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <StyledText isActive={isActive === 'Received'}>Received</StyledText>
      </Button>
      <Button
        onPress={() => {
          setIsActive('Sent');
          onSetType('Sent');
        }}
        isActive={isActive === 'Sent'}
        style={{
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <StyledText isActive={isActive === 'Sent'}>Sent</StyledText>
      </Button>
    </View>
  );
};

export default InvitationNavigation;
