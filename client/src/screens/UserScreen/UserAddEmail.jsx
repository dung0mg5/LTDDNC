import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import toast from 'react-hot-toast/headless';

import Title from '../../ui/Title';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import {signup} from '../../services/apiAuth';

function UserAddPassword({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {firstName, lastName} = route.params;

  async function handleSignUp() {
    setIsLoading(true);
    const {data, errorMessage} = await signup({
      email,
      password,
      firstName,
      lastName,
    });
    setIsLoading(false);

    if (errorMessage) {
      toast(errorMessage, {type: 'error'});
      return;
    }
    return navigation.navigate('location', {
      userId: data._id,
      firstName,
      lastName,
      email,
    });
  }

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      {isLoading && <Spinner />}
      <View style={{marginTop: 110}} />
      <Title>{email ? 'Set your password' : 'Add you email'}</Title>
      <KeyboardAvoidingView>
        <View style={{marginTop: 30, marginBottom: 50}}>
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
              Email
            </Text>
            <Input
              height="40px"
              width="385px"
              data={email}
              setData={setEmail}
            />
          </View>
          {email && (
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
                Password
              </Text>
              <Input
                height="40px"
                width="385px"
                data={password}
                setData={setPassword}
                type={isPasswordVisible ? 'text' : 'password'}>
                <TouchableOpacity
                  onPress={() =>
                    setIsPasswordVisible(
                      prevIsPasswordVisible => !prevIsPasswordVisible,
                    )
                  }>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#2D64BC',
                      fontWeight: 700,
                      marginRight: 15,
                    }}>
                    {isPasswordVisible ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </Input>
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: 25,
                  marginRight: 'auto',
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#666666',
                  width: 389,
                }}>
                8 or more characters
              </Text>
            </View>
          )}
        </View>
        <Button
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={handleSignUp}>
          Continue
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default UserAddPassword;
