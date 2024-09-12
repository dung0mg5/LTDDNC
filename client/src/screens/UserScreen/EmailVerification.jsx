import React, {useEffect, useCallback, useState} from 'react';
import {Image, KeyboardAvoidingView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import toast from 'react-hot-toast/headless';

import Logo from '../../ui/Logo';
import Title from '../../ui/Title';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import {sendEmailVerification, verifyOtp} from '../../services/apiAuth';
import {updateInfoNewUser} from '../../services/userApi';
import {useNavigation} from '@react-navigation/native';

function EmailVerification({route}) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {userId, email} = route.params;
  const navigation = useNavigation();

  async function handleVerifyEmail() {
    setIsLoading(true);
    const {data, errorMessage} = await verifyOtp({
      token: otp,
      email,
    });

    if (!errorMessage && data.isValid) {
      const formData = new URLSearchParams();
      formData.append('isVerified', true);
      await updateInfoNewUser({
        userId,
        userInfo: formData,
      });
    } else {
      return toast(errorMessage, {type: 'error'});
    }
    setIsLoading(false);
    setOtp('');

    return navigation.navigate('login');
  }

  async function sendEmail() {
    setIsLoading(true);
    const {errorMessage} = await sendEmailVerification({
      userId,
      type: 'signup',
    });
    if (errorMessage) {
      return toast.error(errorMessage);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    sendEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Logo />
      {isLoading && <Spinner />}
      <KeyboardAvoidingView style={{flex: 1}}>
        <Title>Enter the verification code</Title>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            gap: 10,
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../../../assets/images/success-v2.png')}
          />
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: '500',
              color: 'green',
            }}>
            We sent the verification code to{'\n'}
            {email} email.
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
          <Button colorText="#6c6c6c" onHandlePress={sendEmail}>
            Resend code
          </Button>
          <Button
            backgroundColor={otp ? '#2D64BC' : '#EAEAEA'}
            colorText={otp ? '#FFFFFF' : '#A4A4A4'}
            onHandlePress={handleVerifyEmail}>
            Submit
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default EmailVerification;
