import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import UserAddName from './UserAddName';
import UserAddEmail from './UserAddEmail';
import UserAddLocation from './UserAddLocation';
import UserAddProfile from './UserAddProfile';
import UserAddAvatar from './UserAddAvatar';
import EmailVerification from './EmailVerification';

const Tab = createBottomTabNavigator();

const SignUpTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarButton: () => null,
      }}>
      <Tab.Screen name="name" component={UserAddName} />
      <Tab.Screen name="email" component={UserAddEmail} />
      <Tab.Screen name="location" component={UserAddLocation} />
      <Tab.Screen name="profile" component={UserAddProfile} />
      <Tab.Screen name="avatar" component={UserAddAvatar} />
      <Tab.Screen name="verification" component={EmailVerification} />
    </Tab.Navigator>
  );
};

export default SignUpTabNavigator;
