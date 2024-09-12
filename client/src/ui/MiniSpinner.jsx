import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styled from 'styled-components/native';

const ContainerLoading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const MiniSpinner = () => {
  return (
    <View>
      <ContainerLoading>
        <ActivityIndicator size="large" color="#fff" />
      </ContainerLoading>
    </View>
  );
};

export default MiniSpinner;
