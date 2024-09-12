import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

const StyledButton = styled.TouchableOpacity`
  width: ${props => props.width || 385}px;
  margin-left: auto;
  margin-right: auto;
  padding: ${props => props.padding || 15}px;
  border-width: ${props => props.borderWidth || 0}px;
  border-color: ${props => props.borderColor || '#fff'};
  border-radius: 34px;
  background-color: ${props => props.backgroundColor || '#fff'};
`;

function Button({
  children,
  colorText,
  backgroundColor,
  borderWidth,
  borderColor,
  margin,
  onHandlePress,
  width,
  textSize,
  padding,
}) {
  return (
    <View
      style={
        margin && {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[2],
          marginLeft: margin[3],
        }
      }>
      <StyledButton
        borderWidth={borderWidth}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        onPress={onHandlePress}
        width={width}
        padding={padding}>
        <Text
          style={{
            textAlign: 'center',
            color: colorText,
            fontSize: textSize || 22,
            fontWeight: 800,
          }}>
          {children}
        </Text>
      </StyledButton>
    </View>
  );
}

export default Button;
