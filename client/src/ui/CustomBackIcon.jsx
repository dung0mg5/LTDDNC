import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function CustomBackIcon({onPress, style, icon}) {
  const navigation = useNavigation();
  const handler = onPress ? onPress : () => navigation.goBack();

  return (
    <TouchableOpacity onPress={handler} style={{...style}}>
      {icon === 'close' ? (
        <Image
          source={require('../../assets/icons/close.png')}
          style={{width: 22, height: 22}}
        />
      ) : (
        <Image
          source={require('../../assets/icons/back.png')}
          style={{width: 20, height: 20}}
        />
      )}
    </TouchableOpacity>
  );
}
