import {Image, TouchableOpacity, Text, View, ScrollView} from 'react-native';
import React from 'react';
import useLogin from '../features/authentication/useLogin';
import styled from 'styled-components/native';
import settings from '../constants/Settings';
import BottomNavigation from './MainScreen/BottomNavigation';
import HeaderSetting from '../features/settings/HeaderSetting';

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Column = styled.View`
  flex-direction: column;
`;

const StyledImage = styled.Image`
  border-width: ${props => (props.icon.title ? 0 : 1)}px;
  border-color: ${props => (props.icon.title ? 'transparent' : '#e9e9e9')};
  border-radius: ${props => (props.icon.width ? props.icon.width / 2 : 0)}px;
  overflow: ${props => (props.icon.title ? 'visible' : 'hidden')};
  width: ${props => props.icon.width || 40}px;
  height: ${props => props.icon.height || 40}px;
`;

function SettingItems({
  fontSize,
  fontWeight,
  color,
  icon,
  margin,
  marginText,
  onHandlePress,
}) {
  return (
    <Row
      onPress={onHandlePress}
      style={{
        backgroundColor: '#fff',
        marginTop: margin[0],
        marginLeft: margin[3],
      }}>
      {(icon?.url || icon?.image) && (
        <StyledImage icon={icon} source={icon.image || {uri: icon.url}} />
      )}
      <Text
        style={{
          fontSize: fontSize,
          fontWeight: fontWeight,
          color: color,
          marginLeft: marginText[3],
        }}>
        {icon.title || 'Settings'}
      </Text>
    </Row>
  );
}

export default function Settings() {
  const {profile, handleLogout} = useLogin();

  return (
    <View style={{backgroundColor: '#fff'}}>
      <HeaderSetting />
      <ScrollView
        style={{
          marginBottom: 100,
        }}>
        <Column>
          <SettingItems
            color="#000"
            fontSize={40}
            fontWeight={800}
            icon={{
              url: profile?.user.authenticatedUser.avatar.url,
              width: 40,
              height: 40,
            }}
            margin={[20, 0, 0, 20]}
            marginText={[0, 0, 0, 10]}
          />
          <SettingItems
            color="#000"
            fontSize={25}
            fontWeight={800}
            icon={{...settings[0], width: 20, height: 20}}
            margin={[40, 0, 0, 30]}
            marginText={[0, 0, 0, 20]}
          />
          <SettingItems
            color="#000"
            fontSize={25}
            fontWeight={800}
            icon={{...settings[1], width: 20, height: 20}}
            margin={[50, 0, 0, 30]}
            marginText={[0, 0, 0, 20]}
          />
          <SettingItems
            color="#000"
            fontSize={25}
            fontWeight={800}
            icon={{...settings[2], width: 20, height: 20}}
            margin={[50, 0, 0, 30]}
            marginText={[0, 0, 0, 20]}
          />
          <SettingItems
            color="#000"
            fontSize={25}
            fontWeight={800}
            icon={{...settings[3], width: 20, height: 20}}
            margin={[50, 0, 0, 30]}
            marginText={[0, 0, 0, 20]}
          />
        </Column>
        <Column
          style={{
            borderTopColor: '#e9e9e9',
            borderTopWidth: 1,
            marginTop: 40,
            marginLeft: 20,
            marginRight: 20,
          }}>
          <SettingItems
            color="#666"
            fontSize={18}
            fontWeight={800}
            icon={{title: 'Help center'}}
            margin={[40, 0, 0, 0]}
            marginText={[0, 0, 0, 0]}
          />
          <SettingItems
            color="#666"
            fontSize={18}
            fontWeight={800}
            icon={{title: 'Professional Community Policies'}}
            margin={[30, 0, 0, 0]}
            marginText={[0, 0, 0, 0]}
          />
          <SettingItems
            color="#666"
            fontSize={18}
            fontWeight={800}
            icon={{title: 'Privacy Policy'}}
            margin={[30, 0, 0, 0]}
            marginText={[0, 0, 0, 0]}
          />
          <SettingItems
            color="#666"
            fontSize={18}
            fontWeight={800}
            icon={{title: 'Accessibility'}}
            margin={[30, 0, 0, 0]}
            marginText={[0, 0, 0, 0]}
          />

          <SettingItems
            color="#666"
            fontSize={18}
            fontWeight={800}
            icon={{title: 'Recommendation Transparency'}}
            margin={[30, 0, 0, 0]}
            marginText={[0, 0, 0, 0]}
          />
          <SettingItems
            color="#666"
            fontSize={18}
            fontWeight={800}
            icon={{title: 'User Agreement'}}
            margin={[30, 0, 0, 0]}
            marginText={[0, 0, 0, 0]}
          />
          <SettingItems
            color="#666"
            fontSize={18}
            fontWeight={800}
            icon={{title: 'End User License Agreement'}}
            margin={[30, 0, 0, 0]}
            marginText={[0, 0, 0, 0]}
          />
          <SettingItems
            color="#666"
            fontSize={18}
            fontWeight={800}
            icon={{title: 'Sign Out'}}
            margin={[30, 0, 0, 0]}
            marginText={[0, 0, 0, 0]}
            onHandlePress={handleLogout}
          />
          <View style={{height: 50}} />
        </Column>
      </ScrollView>
    </View>
  );
}
