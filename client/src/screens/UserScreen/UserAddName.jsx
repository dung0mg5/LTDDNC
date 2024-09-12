import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Logo from '../../ui/Logo';
import Title from '../../ui/Title';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

function UserAddName({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Logo />
      <Title>Add your name</Title>
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
              First name
            </Text>
            <Input
              height="40px"
              width="385px"
              data={firstName}
              setData={setFirstName}
            />
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
              }}>
              Last name
            </Text>
            <Input
              height="40px"
              width="385px"
              data={lastName}
              setData={setLastName}
            />
          </View>
        </View>
        <Button
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={() =>
            navigation.jumpTo('email', {firstName, lastName})
          }>
          Continue
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default UserAddName;
