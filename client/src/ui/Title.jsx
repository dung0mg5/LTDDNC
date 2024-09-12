import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

const StyledTitle = styled.Text`
  font-size: 30px;
  color: #000;
  margin: 30px 0 0 20px;
  font-weight: 800;
`;

function Title({children}) {
  return (
    <View>
      <StyledTitle>{children}</StyledTitle>
    </View>
  );
}

export default Title;
