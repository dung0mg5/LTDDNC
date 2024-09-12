import React, {useEffect, useRef, useState} from 'react';
import Search from '../../ui/Search';
import {Image, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomBackIcon from '../../ui/CustomBackIcon';
import useLogin from '../../features/authentication/useLogin';
import JobNavigation from '../../features/jobs/JobNavigation';

export default function HeaderMain({currentScreen}) {
  const navigation = useNavigation();
  const inputSearch = useRef(null);
  const [isFocusedSearch, setIsFocusedSearch] = useState(false);
  const [search, setSearch] = useState('');
  const {profile} = useLogin();

  function outFocus() {
    inputSearch.current.blur();
    if (currentScreen === 'home') {
      navigation.jumpTo('home');
    } else if (currentScreen === 'network') {
      navigation.jumpTo('network');
    } else if (currentScreen === 'notification') {
      navigation.jumpTo('notification');
    } else if (currentScreen === 'job') {
      navigation.jumpTo('job');
    }

    setIsFocusedSearch(false);
    setSearch('');
  }

  useEffect(() => {
    if (isFocusedSearch) {
      navigation.jumpTo('search', {search});
    }
  }, [navigation, isFocusedSearch, search]);

  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: !isFocusedSearch && 'space-between',
          alignItems: 'center',
          gap: isFocusedSearch && 20,
          height: 70,
        }}>
        {!isFocusedSearch ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#e9e9e9',
                borderRadius: 40,
                overflow: 'hidden',
                marginLeft: 20,
                width: 40,
                height: 40,
              }}
              source={{uri: profile?.user.authenticatedUser.avatar.url}}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginLeft: 20,
            }}>
            <CustomBackIcon onPress={outFocus} />
          </View>
        )}
        <Search
          onSetIsFocusedSearch={setIsFocusedSearch}
          onSetSearch={setSearch}
          search={search}
          isFocusedSearch={isFocusedSearch}
          inputSearch={inputSearch}
          currentScreen={currentScreen}
        />
        {!isFocusedSearch ? (
          <TouchableOpacity onPress={() => navigation.navigate('chat')}>
            <Image
              style={{
                marginRight: 20,
              }}
              source={require('../../../assets/icons/chat.png')}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {currentScreen === 'job' && <JobNavigation />}
    </View>
  );
}
