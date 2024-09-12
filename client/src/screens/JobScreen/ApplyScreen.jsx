import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import CustomBackIcon from '../../ui/CustomBackIcon';
import useLogin from '../../features/authentication/useLogin';
import Input from '../../ui/Input';
import {useNavigation} from '@react-navigation/native';

const StyledText = styled.Text`
  margin-left: 20px;
  margin-top: 20px;
  font-weight: 500;
  color: #666666;
  font-size: 16px;
`;

export default function ApplyScreen({route}) {
  const {job} = route.params;
  const {profile} = useLogin();
  const navigation = useNavigation();
  const [phoneCountryCode, setPhoneCountryCode] = useState('');
  const [email, setEmail] = useState(profile.user.authenticatedUser.email);
  const [mobilePhone, setMobilePhone] = useState('');

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20,
          alignItems: 'center',
          gap: 60,
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <CustomBackIcon icon="close" />
        <Text
          numberOfLines={1}
          style={{
            fontWeight: '700',
            width: 300,
            fontSize: 20,
          }}>
          Apply to {job.company.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={{
            marginTop: 20,
          }}>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 25,
              fontWeight: '700',
            }}>
            Contact info
          </Text>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
              flexDirection: 'row',
              gap: 20,
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
              source={{
                uri: profile.user.authenticatedUser.avatar.url,
              }}
            />
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 700,
                }}>
                {profile.user.authenticatedUser.fullName}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 500,
                }}>
                {profile.user.authenticatedUser.headline}
              </Text>
              <Text
                style={{
                  color: '#666',
                  fontSize: 15,
                  fontWeight: 600,
                }}>
                {profile.user.authenticatedUser.location}
              </Text>
            </View>
          </View>
          <View>
            <StyledText>Email address*</StyledText>
            <Input
              height="30px"
              width="385px"
              colorText="#666"
              sizeText={16}
              data={email}
              setData={text => setEmail(text)}
            />
          </View>
          <View>
            <StyledText>Phone country code*</StyledText>
            <Input
              height="30px"
              width="385px"
              colorText="#666"
              sizeText={16}
              data={phoneCountryCode}
              setData={text => setPhoneCountryCode(text)}
            />
          </View>
          <View>
            <StyledText>Mobile phone number*</StyledText>
            <Input
              height="30px"
              width="385px"
              colorText="#666"
              sizeText={16}
              data={mobilePhone}
              setData={text => setMobilePhone(text)}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#ddd',
          marginRight: 20,
          marginTop: 350,
          marginLeft: 20,
        }}>
        <TouchableOpacity
          disabled={!email || !mobilePhone || !phoneCountryCode}
          onPress={() =>
            navigation.navigate('upload-resume', {
              job,
              phoneCountryCode,
              mobilePhone,
              email,
            })
          }
          style={{
            backgroundColor:
              !email || !mobilePhone || !phoneCountryCode ? '#ddd' : '#2D64BC',
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 25,
            width: 100,
            marginTop: 15,
            marginLeft: 290,
          }}>
          <Text
            style={{
              color:
                !email || !mobilePhone || !phoneCountryCode ? '#666' : '#fff',
              fontWeight: '700',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
