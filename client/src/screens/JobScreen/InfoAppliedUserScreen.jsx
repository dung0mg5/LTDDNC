import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Input from '../../ui/Input';
import {accessChats} from '../../services/apiChat';
import useLogin from '../../features/authentication/useLogin';
import {useNavigation} from '@react-navigation/native';
import {useChat} from '../../context/ChatContext';

const StyledText = styled.Text`
  margin-left: 20px;
  margin-top: 20px;
  font-weight: 500;
  color: #666666;
  font-size: 16px;
`;

export default function InfoAppliedUserScreen({route}) {
  const {appliedUser} = route.params;
  const {setSelectedChat} = useChat();
  const navigation = useNavigation();

  async function handleContract() {
    const formData = new URLSearchParams();
    formData.append('users', JSON.stringify([appliedUser.user._id]));

    const {data, errorMessage} = await accessChats({formData});

    setSelectedChat(data.data._id);
    navigation.navigate('chat');
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderTopColor: '#EAEAEA',
        borderTopWidth: 1,
      }}>
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
                uri: appliedUser.user.avatar.url,
              }}
            />
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 700,
                }}>
                {appliedUser.user.fullName}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 500,
                }}>
                {appliedUser.user.headline}
              </Text>
              <Text
                style={{
                  color: '#666',
                  fontSize: 15,
                  fontWeight: 600,
                }}>
                {appliedUser.user.location}
              </Text>
            </View>
          </View>
          <View>
            <StyledText>Email address</StyledText>
            <Input
              height="30px"
              width="385px"
              colorText="#666"
              sizeText={16}
              data={appliedUser.email}
            />
          </View>
          <View>
            <StyledText>Phone country code</StyledText>
            <Input
              height="30px"
              width="385px"
              colorText="#666"
              sizeText={16}
              data={appliedUser.phoneCountryCode}
            />
          </View>
          <View>
            <StyledText>Mobile phone number</StyledText>
            <Input
              height="30px"
              width="385px"
              colorText="#666"
              sizeText={16}
              data={appliedUser.phone}
            />
          </View>
        </View>
      </View>
      <View>
        <StyledText>Cv</StyledText>

        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#ddd',
            marginLeft: 20,
            marginTop: 20,
            marginRight: 20,
            borderRadius: 10,
          }}>
          <View
            style={{
              width: 50,
              height: 80,
              backgroundColor: '#CB3F2E',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 20,
                paddingTop: 25,
                paddingLeft: 5,
              }}>
              PDF
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(appliedUser.cv.url);
            }}
            style={{
              marginLeft: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
              }}>
              {appliedUser.cv.public_id}.pdf
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#ddd',
          marginRight: 20,
          marginTop: 160,
          marginLeft: 20,
        }}>
        <TouchableOpacity
          onPress={handleContract}
          style={{
            backgroundColor: '#2D64BC',
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 25,
            width: 130,
            marginTop: 15,
            marginLeft: 270,
          }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Contract
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
