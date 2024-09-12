import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EditProfileScreen from './EditProfileScreen';
import ProfileScreen from './ProfileScreen';
import CustomBackIcon from '../../ui/CustomBackIcon';

const Tab = createBottomTabNavigator();

const ProfileTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          display: 'none',
        },
      }}>
      <Tab.Screen name="detail" component={ProfileScreen} />
      <Tab.Screen
        name="edit"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false, // applied here
          headerLeft: () => (
            <CustomBackIcon
              icon="close"
              style={{
                marginLeft: 20,
              }}
            />
          ),
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: '800',
          },
          title: 'Edit intro',
        }}
      />
    </Tab.Navigator>
  );
};

export default ProfileTabNavigator;
