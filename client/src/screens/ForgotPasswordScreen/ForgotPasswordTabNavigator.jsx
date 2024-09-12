import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ForgotPassword from './ForgotPassword';
import OTPVerification from './OTPVerification';
import ConfirmPassword from './ConfirmPassword';

const Tab = createBottomTabNavigator();

const ForgotPasswordTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarButton: () => null,
      }}>
      <Tab.Screen name="email" component={ForgotPassword} />
      <Tab.Screen name="otp" component={OTPVerification} />
      <Tab.Screen name="confirm" component={ConfirmPassword} />
    </Tab.Navigator>
  );
};

export default ForgotPasswordTabNavigator;
