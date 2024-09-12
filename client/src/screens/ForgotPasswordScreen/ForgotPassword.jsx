import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Logo from '../../ui/Logo';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Title from '../../ui/Title';
import Spinner from '../../ui/Spinner';
import {forgotPassword} from '../../services/apiAuth';
import {useNavigation} from '@react-navigation/native';
import toast from 'react-hot-toast/headless';

function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleForgotPassword() {
    setIsLoading(true);
    const {errorMessage} = await forgotPassword({email});
    setIsLoading(false);
    if (errorMessage) {
      return toast(errorMessage, {type: 'error'});
    }

    navigation.jumpTo('otp', {email});
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      {isLoading && <Spinner />}
      <Logo />
      <KeyboardAvoidingView style={{flex: 1}}>
        <Title>Forgot Password</Title>
        <View style={{marginTop: 30}}>
          <Input
            height="64px"
            width="385px"
            placeholder="Email"
            placeholderTextColor="#666"
            data={email}
            setData={setEmail}
          />
        </View>
        <View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 25,
              marginBottom: 50,
              marginRight: 'auto',
              fontSize: 20,
              fontWeight: '500',
              color: '#666666',
              width: 389,
              lineHeight: 30,
            }}>
            We’ll send a verification code to this{'\n'}email if it matches an
            existing SocialJob{'\n'}account
          </Text>
        </View>

        <Button
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={handleForgotPassword}>
          Next
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ForgotPassword;
