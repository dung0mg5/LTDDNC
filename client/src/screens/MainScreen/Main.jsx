/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useLogin from '../../features/authentication/useLogin';
import BottomNavigation from './BottomNavigation';
import HeaderMain from './HeaderMain';

export default function Main({navigation}) {
  const {profile} = useLogin();
  const [currentScreen, setCurrentScreen] = useState('home');

  useEffect(() => {
    if (!profile?.user) {
      navigation.closeDrawer();
      navigation.navigate('login');
    }
  }, [profile]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <HeaderMain currentScreen={currentScreen} />
      <BottomNavigation onSetCurrentScreen={setCurrentScreen} />
    </SafeAreaView>
  );
}
