/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Alert, Linking, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Slider from './Slider';
import Logo from '../../ui/Logo';
import Button from '../../ui/Button';
import useLogin from '../../features/authentication/useLogin';
import Spinner from '../../ui/Spinner';

const Home = ({navigation}) => {
  const {isLoading, profile} = useLogin();

  useEffect(() => {
    if (profile?.user) {
      navigation.navigate('main');
    }
  }, [profile]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Logo />
      <Slider />
      {isLoading && <Spinner />}

      <View
        style={{
          position: 'absolute',
          bottom: 350,
          width: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#5F5F5F',
            fontWeight: '600',
          }}>
          By clicking Agree & Join or Continue, you agree to{'\n'}LinkedIn's
          User Agreement, Privacy Policy and Cookie{'\n'}Policy.
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 70,
          width: '100%',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 30,
        }}>
        <Button
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={() =>
            navigation.navigate('signup', {
              screen: 'name',
            })
          }>
          Agree & Join
        </Button>

        <Button
          borderWidth={1}
          borderColor="#000"
          colorText="#666"
          onHandlePress={() =>
            Alert.alert(
              '"SocialJob" Wants to Use "google.com" to Sign In',
              'This allows the app and website to share information about you.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Continue',
                  onPress: () =>
                    Linking.openURL('http://localhost:8000/api/v1/auth/google'),
                },
              ],
            )
          }>
          Continue With Google
        </Button>
        <Button
          colorText="#2D64BC"
          margin={[10, 0, 0, 0]}
          onHandlePress={() => navigation.navigate('login')}>
          Sign In
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;
