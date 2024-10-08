import {Text, View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  border-radius: 20px;
  border-width: 1px;
  border-color: #a3a3a3;
  background-color: ${props => (props.isActive ? '#337447' : '#fff')};
`;

const StyledText = styled.Text`
  text-align: center;
  font-weight: 800;
  font-size: 18px;
  padding: 8px;
  color: ${props => (props.isActive ? '#fff' : '#676767')};
`;

function SentNavigation({sentInvitations}) {
  const [isActive, setIsActive] = useState('People');

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        margin: 10,
      }}>
      <Button
        isActive={isActive === 'People'}
        onPress={() => setIsActive('People')}>
        <StyledText isActive={isActive === 'People'}>
          People <Text>({sentInvitations.count})</Text>
        </StyledText>
      </Button>
      <Button
        isActive={isActive === 'Pages'}
        onPress={() => setIsActive('Pages')}>
        <StyledText isActive={isActive === 'Pages'}>
          Pages <Text>(0)</Text>
        </StyledText>
      </Button>
      <Button
        isActive={isActive === 'Events'}
        onPress={() => setIsActive('Events')}>
        <StyledText isActive={isActive === 'Events'}>
          Events <Text>(0)</Text>
        </StyledText>
      </Button>
    </View>
  );
}

export default SentNavigation;
