import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAvoidingView, Text, TouchableOpacity, View} from 'react-native';

import Logo from '../../ui/Logo';
import Title from '../../ui/Title';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import {resetPassword} from '../../services/apiAuth';
import toast from 'react-hot-toast/headless';
import {useNavigation} from '@react-navigation/native';

function ConfirmPassword({route}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const {email, token} = route.params;

  async function handleChangePassword() {
    setIsLoading(true);
    const {data, errorMessage} = await resetPassword({
      email,
      token,
      newPassword: password,
    });
    setIsLoading(false);

    if (errorMessage) {
      return toast(errorMessage, {type: 'error'});
    }

    toast.success(data.message);
    return navigation.navigate('login');
  }

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Logo />
      {isLoading && <Spinner />}
      <KeyboardAvoidingView style={{flex: 1}}>
        <Title>Choose new a password</Title>
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
            }}>
            To secure your account, choose a{'\n'}strong password you haven’t
            used{'\n'}before and is at least 8 characters long{' '}
          </Text>
        </View>

        <View style={{gap: 20, marginTop: 20, marginBottom: 50}}>
          <Input
            height="64px"
            width="385px"
            placeholder="New Password"
            placeholderTextColor="#666"
            data={password}
            setData={setPassword}
            type={isPasswordVisible ? 'text' : 'password'}>
            <TouchableOpacity
              onPress={() =>
                setIsPasswordVisible(prevShowPassword => !prevShowPassword)
              }>
              <Text
                style={{
                  fontSize: 20,
                  color: '#2D64BC',
                  fontWeight: 700,
                  marginRight: 15,
                }}>
                Show
              </Text>
            </TouchableOpacity>
          </Input>
          <Input
            height="64px"
            width="385px"
            placeholder="Retype new Password"
            placeholderTextColor="#666"
            data={confirmPassword}
            setData={setConfirmPassword}
            type="password"
          />
        </View>
        <Button
          isBottom={true}
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={handleChangePassword}>
          Submit
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ConfirmPassword;
