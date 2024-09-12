import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import toast from 'react-hot-toast/headless';

import Title from '../../ui/Title';
import Logo from '../../ui/Logo';
import SliderSwitch from '../../ui/SliderSwitch';
import EmploymentForm from '../../features/authentication/EmploymentForm';
import StudentForm from '../../features/authentication/StudentForm';
import Button from '../../ui/Button';
import {updateInfoNewUser} from '../../services/userApi';
import Spinner from '../../ui/Spinner';

const defaultProfile = {
  jobTitle: '',
  company: {},
  employmentType: '',
  school: {},
  startYear: '',
  endYear: '',
};

function UserAddProfile({navigation, route}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);
  const {location, email, userId, firstName, lastName} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  function toggleSwitch() {
    setProfile({...defaultProfile, location: location});
    setIsEnabled(previousState => !previousState);
  }

  async function handleUpdateProfile() {
    setIsLoading(true);
    const formData = new URLSearchParams();
    formData.append('location', location);
    formData.append(
      'experiences',
      JSON.stringify(
        profile.company?._id
          ? [
              {
                company: profile.company._id,
                nameOfCompany: profile.company.name, // for create headline first create new user
                jobTitle: profile.jobTitle,
                typeEmployment: profile.employmentType,
              },
            ]
          : [],
      ),
    );
    formData.append(
      'educations',
      JSON.stringify(
        profile.school?._id
          ? [
              {
                school: profile.school._id,
                nameOfSchool: profile.school.name, // for create headline first create new user
                startYear: profile.startYear,
                endYear: profile.endYear,
              },
            ]
          : [],
      ),
    );

    const {errorMessage} = await updateInfoNewUser({
      userId,
      userInfo: formData,
    });

    if (errorMessage) {
      return toast(errorMessage, {type: 'error'});
    }
    setIsLoading(false);

    return navigation.navigate('avatar', {
      profile,
      userId,
      firstName,
      lastName,
      email,
    });
  }

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Logo />

      <Title>
        Your profile helps you discover new people and opportunities
      </Title>
      {isLoading && <Spinner />}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#000',
            width: 389,
            flex: 1,
          }}>
          I'm a student
        </Text>
        <SliderSwitch toggleSwitch={toggleSwitch} isEnabled={isEnabled} />
      </View>
      <KeyboardAvoidingView>
        {isEnabled ? (
          <StudentForm profile={profile} onSetProfile={setProfile} />
        ) : (
          <EmploymentForm profile={profile} onSetProfile={setProfile} />
        )}
        <Button
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={handleUpdateProfile}>
          Next
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default UserAddProfile;
