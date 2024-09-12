import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Logo from '../../ui/Logo';
import Title from '../../ui/Title';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import {verifyOtp} from '../../services/apiAuth';
import toast from 'react-hot-toast/headless';

function OTPVerification({route, navigation}) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {email} = route.params;

  async function handleOTPVerification() {
    setIsLoading(true);
    const {errorMessage} = await verifyOtp({token: otp, email});
    setIsLoading(false);

    if (errorMessage) {
      return toast(errorMessage, {type: 'error'});
    }
    navigation.jumpTo('confirm', {email, token: otp});
  }
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      {isLoading && <Spinner />}
      <Logo />
      <KeyboardAvoidingView style={{flex: 1}}>
        <Title>Enter the 6-digit code</Title>
        <View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 20,
              marginRight: 'auto',
              fontSize: 20,
              fontWeight: '500',
              color: '#666666',
              width: 389,
              lineHeight: 30,
            }}>
            Check {email}
            {'\n'}for a verification code
          </Text>
        </View>

        <View style={{gap: 30}}>
          <View>
            <Text
              style={{
                marginLeft: 20,
                marginTop: 20,
                fontWeight: '500',
                color: '#666666',
                fontSize: 20,
              }}>
              6 digit code*
            </Text>
            <Input height="40px" width="385px" data={otp} setData={setOtp} />
          </View>
          <Button
            backgroundColor="#2D64BC"
            colorText="#fff"
            onHandlePress={handleOTPVerification}>
            Submit
          </Button>
        </View>

        <View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 20,
              marginRight: 'auto',
              fontSize: 20,
              fontWeight: '500',
              color: '#666666',
              width: 389,
              lineHeight: 30,
            }}>
            If you don’t see a code in your inbox,{'\n'}check your spam folder.
            If it’s not there,{'\n'}the email address may not be confirmed{'\n'}
            or it may not match an existing{'\n'}SocialJob account
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default OTPVerification;
