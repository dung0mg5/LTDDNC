import React from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import styled from 'styled-components/native';

const StyledUploadAvatar = styled.View`
  border-width: 1px;
  height: 240px;
  width: 360px;
  margin: 40px auto;
  border-color: #e9e9e9;
  background-color: #f9fafb;
  border-radius: 10px;
`;

const Container = styled.View`
  margin: 15px auto;
  width: 80px;
  height: 80px;
  padding: 20px;
  border: 1px solid #e9e9e9;
  border-radius: 45px;
`;

const StyledImage = styled.Image`
  width: ${props => (props.selectedImage ? '80px' : '40px')};
  height: ${props => (props.selectedImage ? '80px' : '40px')};
  margin: ${props => (props.selectedImage ? '15px' : '0px')} auto;
  border-width: ${props => (props.selectedImage ? '1px' : '0px')};
  border-color: ${props => (props.selectedImage ? '#e9e9e9' : 'transparent')};
  border-radius: ${props => (props.selectedImage ? '40px' : '0px')};
  overflow: ${props => (props.selectedImage ? 'hidden' : 'visible')};
`;

function UploadAvatar({data, selectedImage, onSetSelectedImage}) {
  function handleUploadImage() {
    launchImageLibrary(
      {
        storageOptions: {
          path: 'image',
        },
      },
      res => {
        if (res.didCancel) {
          return;
        }
        onSetSelectedImage(res.assets[0].uri);
      },
    );
  }
  return (
    <TouchableWithoutFeedback onPress={handleUploadImage}>
      <StyledUploadAvatar>
        {!selectedImage ? (
          <Container>
            <StyledImage
              source={require('../../../assets/images/uploadAvatar.png')}
            />
          </Container>
        ) : (
          <StyledImage
            source={{uri: selectedImage}}
            selectedImage={selectedImage}
          />
        )}

        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 800,
            color: '#000',
          }}>
          {data.firstName} {data.lastName}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 800,
            color: '#000',
            marginTop: 10,
          }}>
          {data.profile.company?._id &&
            `${data.profile.jobTitle} at ${data.profile.company.name}`}
          {data.profile.school?._id && `Student at ${data.profile.school.name}`}
        </Text>
      </StyledUploadAvatar>
    </TouchableWithoutFeedback>
  );
}

export default UploadAvatar;
