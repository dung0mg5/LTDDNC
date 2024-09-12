import React from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import useLogin from '../authentication/useLogin';

const Button = styled.TouchableOpacity`
  border-radius: 20px;
  border-width: 1px;
  border-color: #a3a3a3;
  background-color: #fff;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledText = styled.Text`
  text-align: center;
  font-weight: 800;
  font-size: 20px;
  padding: 8px;
  color: #676767;
`;

function JobNavigation() {
  const navigation = useNavigation();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        flexDirection: 'row',
        margin: 10,
      }}>
      <Button onPress={() => navigation.navigate('my-jobs')}>
        <StyledText>My jobs</StyledText>
      </Button>
      <Button>
        <StyledText>Preferences</StyledText>
      </Button>
      <Button>
        <StyledText onPress={() => navigation.navigate('create-job')}>
          Post a free job
        </StyledText>
      </Button>
    </ScrollView>
  );
}

export default JobNavigation;
