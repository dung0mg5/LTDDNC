import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import styled from 'styled-components/native';

import useLogin from '../features/authentication/useLogin';
import Button from '../ui/Button';
import ActivityNavigation from '../features/users/ActivityNavigation';
import Educations from '../features/users/Educations';
import Experiences from '../features/users/Experiences';
import Skills from '../features/users/Skills';
import MoreText from '../features/users/MoreText';
import HeaderProfile from '../features/users/HeaderProfile';

const Title = styled.Text`
  font-size: 25px;
  font-weight: 700;
  margin-left: 20px;
  margin-top: 10px;
`;

const CommonView = styled.View`
  background-color: #fff;
  margin-top: 10px;
`;

function DetailUserScreen() {
  const {profile} = useLogin();

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      <HeaderProfile search={profile.user.authenticatedUser.fullName} />
      <ScrollView
        style={{
          flexDirection: 'column',
          backgroundColor: '#DFDCD7',
        }}>
        <Pressable>
          <Image
            style={{
              height: 100,
              width: '100%',
            }}
            source={{uri: profile?.user.authenticatedUser.cover.url}}
          />
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#fff',
              borderRadius: 15,
              position: 'absolute',
              right: 10,
              top: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 15,
                height: 12,
              }}
              source={require('../../assets/icons/camera.png')}
            />
          </View>
        </Pressable>
        <View>
          <View
            style={{
              backgroundColor: '#fff',
            }}>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#e9e9e9',
                borderRadius: 60,
                overflow: 'hidden',
                width: 120,
                height: 120,
                marginTop: -60,
                marginLeft: 20,
              }}
              source={{uri: profile?.user.authenticatedUser.avatar.url}}
            />
            <Text
              style={{
                fontWeight: '700',
                fontSize: 30,
                marginTop: 15,
                marginLeft: 20,
                flex: 1,
              }}>
              Nguyen Toan
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                marginLeft: 20,
                flex: 1,
              }}>
              {profile?.user.authenticatedUser.experiences[0]?.headline}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                marginTop: 20,
                gap: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                }}>
                {profile?.user.authenticatedUser.experiences[0]?.company?.name}
              </Text>
              <View
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: 50,
                  backgroundColor: '#000',
                }}
              />
              <Text style={{fontWeight: 600}}>
                {profile.user.authenticatedUser.educations[0].school.name}
              </Text>
            </View>

            <Text
              style={{
                color: '#666',
                fontWeight: '500',
                fontSize: 17,
                marginLeft: 20,
                flex: 1,
              }}>
              {profile.user.authenticatedUser.location}
            </Text>
            <Text
              style={{
                color: '#666',
                fontWeight: '600',
                fontSize: 18,
                marginTop: 15,
                marginLeft: 20,
                flex: 1,
              }}>
              {
                profile.user.authenticatedUser.connections.filter(
                  c => c.status === 3,
                ).length
              }{' '}
              connections
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
                marginLeft: 20,
                marginBottom: 10,
              }}>
              <Button
                backgroundColor="#2D64BC"
                colorText="#fff"
                width={170}
                textSize={18}
                padding={6}>
                Open to
              </Button>
              <Button
                borderWidth={1}
                borderColor="#2D64BC"
                colorText="#2D64BC"
                width={170}
                textSize={18}
                padding={6}>
                Add section
              </Button>
              <TouchableOpacity>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    borderColor: '#666',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15,
                  }}>
                  <Image source={require('../../assets/icons/dot.png')} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              top: 15,
            }}>
            <Image source={require('../../assets/icons/edit.png')} />
          </TouchableOpacity>
        </View>
        <CommonView>
          <Title>About</Title>
          <View
            style={{
              marginTop: 10,
              marginRight: 20,
              marginLeft: 20,
              marginBottom: 10,
            }}>
            <MoreText>{profile.user.authenticatedUser.about}</MoreText>
          </View>
        </CommonView>
        <CommonView>
          <Title>Activity</Title>
          <Text
            style={{
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 16,
              fontWeight: '600',
              color: '#666',
            }}>
            {profile.user.authenticatedUser.followers.length} followers
          </Text>
          <ActivityNavigation />
        </CommonView>
        <CommonView>
          <Title>Experience</Title>
          <Experiences
            data={profile.user.authenticatedUser.experiences || []}
          />
        </CommonView>
        <CommonView>
          <Title>Education</Title>
          <Educations data={profile.user.authenticatedUser.educations || []} />
        </CommonView>
        <CommonView>
          <Title>Skills</Title>
          <Skills data={profile.user.authenticatedUser.skills || []} />
        </CommonView>
        <View
          style={{
            height: 20,
          }}
        />
      </ScrollView>
    </View>
  );
}

export default DetailUserScreen;
