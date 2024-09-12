import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import toast from 'react-hot-toast/headless';

import Logo from '../../ui/Logo';
import Title from '../../ui/Title';
import Button from '../../ui/Button';
import UploadAvatar from '../../features/authentication/UploadAvatar';
import {updateAvatar} from '../../services/userApi';
import Spinner from '../../ui/Spinner';

function UserAddAvatar({navigation, route}) {
  const {profile, userId, email, firstName, lastName} = route.params;
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function updateAvatarUser() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('avatar', {
      uri: selectedImage,
      type: 'image/jpeg | image/png | image/jpg',
      name: 'avatar.png',
    });

    const {errorMessage} = await updateAvatar({
      userId,
      formData,
    });
    setIsLoading(false);

    if (errorMessage) {
      return toast.error(errorMessage);
    }

    return navigation.navigate('verification', {userId, email});
  }

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Logo />
      <Title>Adding a photo helps people recognize you</Title>
      {isLoading && <Spinner />}

      <UploadAvatar
        selectedImage={selectedImage}
        onSetSelectedImage={setSelectedImage}
        data={{profile, firstName, lastName}}
      />

      <Button
        backgroundColor="#2D64BC"
        colorText="#fff"
        margin={[150, 0, 0, 0]}
        onHandlePress={updateAvatarUser}>
        Add a photo
      </Button>
      <Button
        colorText="#6C6C6C"
        margin={[10, 0, 0, 0]}
        onHandlePress={() =>
          navigation.navigate('verification', {userId, email})
        }>
        Skip for now
      </Button>
    </SafeAreaView>
  );
}

export default UserAddAvatar;
