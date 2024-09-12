import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

const StyledInput = styled.View`
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  border-width: 1px;
  width: ${props => props.width || '170px'};
  height: ${props => props.height};
  border-radius: 5px;
`;

const StyledTextInput = styled.TextInput`
  color: #000;
  font-size: 22px;
  font-weight: 600;
  margin: 0 15px 0 15px;
  flex: 1;
`;

function Input({
  children,
  height,
  width,
  placeholder,
  placeholderTextColor,
  data,
  setData,
  type,
  sizeText,
  colorText,
}) {
  return (
    <View>
      <StyledInput height={height} width={width}>
        <View
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <StyledTextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            defaultValue={data}
            onChangeText={setData}
            secureTextEntry={type === 'password' ? true : false}
            autoCapitalize="none"
            style={{
              color: colorText || '#000',
              fontSize: sizeText || 22,
            }}
          />

          {children ? children : null}
        </View>
      </StyledInput>
    </View>
  );
}

export default Input;
