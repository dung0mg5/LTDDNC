import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Title from '../../ui/Title';
import Button from '../../ui/Button';
import Logo from '../../ui/Logo';
import SelectInput from '../../ui/SelectInput';
import ModalSearch from '../../features/authentication/ModalSearch';

function UserAddLocation({navigation, route}) {
  const [location, setLocation] = useState('');
  const [modalSearchVisible, setModalSearchVisible] = useState(false);
  const {userId, email, firstName, lastName} = route.params;

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Logo />
      <Title>What's your location</Title>
      <ModalSearch
        title="Location"
        type="location"
        modalSearchVisible={modalSearchVisible}
        closeModalSearch={() => setModalSearchVisible(false)}
        onSetData={setLocation}
        data={location}
      />
      <KeyboardAvoidingView>
        <View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 20,
              fontSize: 18,
              fontWeight: '500',
              color: '#666666',
            }}>
            See people, jobs, and news in your area.
          </Text>
        </View>
        <View style={{marginTop: 30, marginBottom: 50}}>
          <TouchableWithoutFeedback onPress={() => setModalSearchVisible(true)}>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: 20,
                  fontSize: 20,
                  fontWeight: '500',
                  color: '#666666',
                }}>
                Location*
              </Text>
              <SelectInput data={location} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Button
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={() =>
            navigation.navigate('profile', {
              location,
              userId,
              firstName,
              lastName,
              email,
            })
          }>
          Next
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default UserAddLocation;
