import {Image, TextInput, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

function Search({
  search,
  onSetSearch,
  onSetIsFocusedSearch,
  isFocusedSearch,
  inputSearch,
  currentScreen,
}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: !isFocusedSearch ? '65%' : '80%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF3F7',
      }}>
      {!isFocusedSearch && currentScreen !== 'job' && (
        <Image
          style={{
            marginLeft: 10,
            width: 15,
            height: 15,
            tintColor: '#676767',
          }}
          source={require('../../assets/icons/lookup.png')}
        />
      )}
      {!isFocusedSearch && currentScreen === 'job' && (
        <Image
          style={{
            marginLeft: 10,
            width: 15,
            height: 15,
            tintColor: '#676767',
          }}
          source={require('../../assets/icons/job.png')}
        />
      )}

      <TextInput
        ref={inputSearch}
        onFocus={() => onSetIsFocusedSearch(true)}
        style={{
          paddingLeft: 10,
          fontWeight: '500',
        }}
        placeholder="Search"
        placeholderTextColor="#5F6163"
        autoCapitalize="none"
        defaultValue={search}
        onChangeText={onSetSearch}
        onSubmitEditing={() => {
          navigation.navigate('list-job', {search});
          onSetIsFocusedSearch(false);
          onSetSearch('');
        }}
      />
    </View>
  );
}

export default Search;
