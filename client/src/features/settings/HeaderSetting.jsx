import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import CustomBackIcon from '../../ui/CustomBackIcon';

const Header = styled.View`
  height: 65px;
  margin-top: 50px;
  margin-left: 20px;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #e9e9e9;
  background-color: #fff;
`;

function HeaderSetting() {
  return (
    <Header>
      <CustomBackIcon />
    </Header>
  );
}

export default HeaderSetting;
