import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../../ui/Input';
import styled from 'styled-components/native';
import SelectInput from '../../ui/SelectInput';
import CheckBox from '@react-native-community/checkbox';
import useLogin from '../../features/authentication/useLogin';

const StyledText = styled.Text`
  margin-left: 20px;
  margin-top: 20px;
  font-weight: 500;
  color: #666666;
  font-size: 18px;
`;

function EditProfileScreen() {
  const {profile} = useLogin();
  const [user, setUser] = useState({
    firstName: profile.user.authenticatedUser.firstName,
    lastName: profile.user.authenticatedUser.lastName,
    headline: profile.user.authenticatedUser.headline,
    experiences: profile.user.authenticatedUser.experiences,
    industry: profile.user.authenticatedUser.experiences[0].industry,
    educations: profile.user.authenticatedUser.educations,
    country: '',
  });

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <Text
        style={{
          marginLeft: 20,
          marginTop: 20,
          color: '#666',
          fontWeight: '600',
          fontSize: 16,
        }}>
        * Indicates required
      </Text>
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <View>
          <StyledText>First name*</StyledText>
          <Input
            height="40px"
            width="385px"
            data={profile.user.authenticatedUser.firstName}
            setData={text => setUser({...user, firstName: text})}
          />
        </View>
        <View>
          <StyledText>Last name*</StyledText>
          <Input
            height="40px"
            width="385px"
            data={profile.user.authenticatedUser.lastName}
            setData={text => setUser({...user, lastName: text})}
          />
        </View>
        <View>
          <StyledText>Headline*</StyledText>
          <Input
            height="40px"
            width="385px"
            data={profile.user.authenticatedUser.headline}
            setData={text => setUser({...user, headline: text})}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
            }}>
            Current position
          </Text>

          <View
            style={{
              marginLeft: -20,
            }}>
            <StyledText>Position*</StyledText>
            {profile.user.authenticatedUser.experiences.length > 0 && (
              <SelectInput
                data={`${profile.user.authenticatedUser.experiences[0].jobTitle} at ${profile.user.authenticatedUser.experiences[0].company.name}`}>
                <Image
                  source={require('../../../assets/images/vector.png')}
                  style={{marginRight: 10}}
                />
              </SelectInput>
            )}
          </View>

          <TouchableOpacity
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#2D64BC',
                fontWeight: '700',
                fontSize: 18,
              }}>
              + Add new position
            </Text>
          </TouchableOpacity>
          {profile.user.authenticatedUser.experiences.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 40,
              }}>
              <CheckBox
                boxType="square"
                onFillColor="#337447"
                onCheckColor="#fff"
                onTintColor="#337447"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                }}>
                Show current company in my intro
              </Text>
            </View>
          )}
          {profile.user.authenticatedUser.experiences.length > 0 && (
            <View
              style={{
                marginLeft: -20,
              }}>
              <StyledText>Industry*</StyledText>
              <Input
                height="40px"
                width="385px"
                data={profile.user.authenticatedUser.experiences[0].industry}
              />
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
            }}>
            Education
          </Text>

          <View
            style={{
              marginLeft: -20,
            }}>
            <StyledText>School*</StyledText>
            {profile.user.authenticatedUser.educations.length > 0 && (
              <SelectInput
                data={profile.user.authenticatedUser.educations[0].school.name}>
                <Image
                  source={require('../../../assets/images/vector.png')}
                  style={{marginRight: 10}}
                />
              </SelectInput>
            )}
          </View>

          <TouchableOpacity
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#2D64BC',
                fontWeight: '700',
                fontSize: 18,
              }}>
              + Add new education
            </Text>
          </TouchableOpacity>
          {profile.user.authenticatedUser.educations.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 40,
              }}>
              <CheckBox
                boxType="square"
                onFillColor="#337447"
                onCheckColor="#fff"
                onTintColor="#337447"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                }}>
                Show school in my intro
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
            }}>
            Location
          </Text>

          <View
            style={{
              marginLeft: -20,
            }}>
            <StyledText>Country/Region*</StyledText>
            <SelectInput data={profile.user.authenticatedUser.location} />
          </View>

          <TouchableOpacity
            style={{
              marginTop: 30,
            }}>
            <Text
              style={{
                color: '#2D64BC',
                fontWeight: '700',
                fontSize: 20,
              }}>
              Use current location
            </Text>
          </TouchableOpacity>
          {/* <View
            style={{
              marginLeft: -20,
            }}>
            <StyledText>City</StyledText>
            <SelectInput data={'Bien Hoa, Dong Nai'}>
              <Image
                source={require('../../../assets/images/vector.png')}
                style={{marginRight: 10}}
              />
            </SelectInput>
          </View> */}
        </View>
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
            }}>
            Contact info
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: 600,
            }}>
            Add or edit your profile URL, email, and more
          </Text>

          <TouchableOpacity
            style={{
              marginTop: 30,
            }}>
            <Text
              style={{
                color: '#2D64BC',
                fontWeight: '700',
                fontSize: 20,
              }}>
              Edit contact info
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
            backgroundColor: '#2D64BC',
            borderRadius: 30,
          }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              paddingVertical: 10,
              fontSize: 20,
              fontWeight: '700',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default EditProfileScreen;
