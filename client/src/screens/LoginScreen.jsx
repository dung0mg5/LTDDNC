import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Linking,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';

import Logo from '../ui/Logo';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import useLogin from '../features/authentication/useLogin';
import {useNavigation} from '@react-navigation/native';

const StyledText = styled.Text`
  font-size: ${props => props.size || '15px'};
  font-weight: ${props => props.weight || 'normal'};
  color: ${props => props.color || '#000'};
`;

const Header = styled.View`
  margin: 30px 0 0 20px;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {handleLogin, isLoading, profile} = useLogin();
  const navigation = useNavigation();

  // useEffect(() => {
  //   Linking.addEventListener('url', event => {
  //     let {url} = event;
  //     url = url.slice(0, -1);

  //     const queryUser = url.split('user=')[1];
  //     console.log('queryUser: ', decodeURIComponent(queryUser));
  //   });
  // }, []);

  useEffect(() => {
    if (profile?.user) {
      navigation.navigate('main');
    }
  }, [profile]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Logo />
      {isLoading && <Spinner />}
      <KeyboardAvoidingView style={{flex: 1}}>
        <Header>
          <StyledText size="48px" weight="800">
            Sign in
          </StyledText>
          <StyledText
            size="20px"
            color="#676767"
            weight="700"
            style={{
              marginTop: 15,
            }}>
            or{' '}
            <Text
              style={{color: '#2D64BC'}}
              onPress={() => navigation.navigate('signup')}>
              Join SocialJob
            </Text>
          </StyledText>
        </Header>
        <Input
          data={email}
          setData={setEmail}
          height="64px"
          width="385px"
          placeholder="Email"
          placeholderTextColor="#666"
        />
        <Input
          data={password}
          setData={setPassword}
          height="64px"
          width="385px"
          placeholder="Password"
          placeholderTextColor="#666"
          type="password"
        />
        <View>
          <StyledText
            onPress={() => navigation.navigate('forgot')}
            size="18px"
            color="#2D64BC"
            weight="bold"
            style={{marginLeft: 20, marginTop: 20, marginBottom: 50}}>
            Forgot password?
          </StyledText>
        </View>

        <Button
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={() => {
            handleLogin({email, password});
            setEmail('');
            setPassword('');
          }}>
          Sign in
        </Button>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 30,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#EAEAEA'}} />
          <View>
            <Text
              style={{
                width: 50,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              or
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#EAEAEA'}} />
        </View>
        <Button
          borderWidth={1}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// onHandlePress={() =>
//   Linking.openURL('http://localhost:8000/api/v1/auth/google')
// }
