import React from 'react';
import styled from 'styled-components/native';

const Column = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 80px;
`;

const StyledImage = styled.Image`
  width: 18px;
  height: 18px;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #666666;
`;

export default function CustomButton({emoji, text, color, ...rest}) {
  return (
    <Column activeOpacity={0.7} {...rest}>
      <StyledImage source={emoji} />
      <StyledText style={{color: color}}>{text}</StyledText>
    </Column>
  );
}
