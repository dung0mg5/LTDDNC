import {Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

function SingleSearch({user}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('profile', {
          screen: 'detail',
          params: {user},
        })
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 30,
        marginBottom: 10,
      }}>
      <Image
        style={{
          marginLeft: 20,
        }}
        source={require('../../../assets/icons/lookup.png')}
      />
      <Text
        style={{
          width: 100,
          fontSize: 16,
          fontWeight: '500',
        }}>
        {user.fullName}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          width: 140,
          fontWeight: '500',
          fontSize: 14,
          color: '#676767',
        }}>
        {user.experiences[0]?.headline}
      </Text>
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 20,
        }}
        source={{uri: user.avatar.url}}
      />
    </TouchableOpacity>
  );
}

export default SingleSearch;
