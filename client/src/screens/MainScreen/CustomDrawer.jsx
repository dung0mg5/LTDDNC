import {Image, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import useLogin from '../../features/authentication/useLogin';
import {useNavigation} from '@react-navigation/native';

function CustomDrawer(props) {
  const {profile} = useLogin();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 20,
            marginTop: 20,
            gap: 20,
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#EAEAEA',
              paddingBottom: 20,
            }}>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#e9e9e9',
                borderRadius: 40,
                overflow: 'hidden',
                width: 70,
                height: 70,
              }}
              source={{uri: profile?.user.authenticatedUser.avatar.url}}
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 10,
              }}>
              {profile?.user.authenticatedUser.fullName}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('profile');
                props.navigation.closeDrawer();
              }}>
              <Text
                style={{
                  color: '#666666',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                View profile
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('group');
              props.navigation.closeDrawer();
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: 25,
              }}>
              Groups
            </Text>
          </TouchableOpacity>
        </View>
        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#EAEAEA',
          padding: 10,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 40,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('settings');
            props.navigation.closeDrawer();
          }}
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          <Image source={require('../../../assets/icons/settings.png')} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer;
