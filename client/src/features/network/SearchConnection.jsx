import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';

function SearchConnection({onSetShowSearch}) {
  return (
    <View
      style={{
        borderColor: '#e9e9e9',
        borderBottomWidth: 1,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 70,
      }}>
      <TouchableOpacity onPress={() => onSetShowSearch(false)}>
        <Image
          style={{
            marginLeft: 10,
          }}
          source={require('../../../assets/icons/back-v2.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          width: 370,
          height: 35,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#EFF3F7',
        }}>
        <TextInput
          style={{
            paddingLeft: 10,
            fontWeight: '700',
            fontSize: 16,
          }}
          placeholder="Search by name"
          placeholderTextColor="#5F6163"
          autoCapitalize="none"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <Image
            style={{
              width: 15,
              height: 15,
            }}
            source={require('../../../assets/icons/lookup.png')}
          />
          <TouchableOpacity>
            <Text
              style={{
                color: '#666',
                fontWeight: '800',
                fontSize: 18,
              }}>
              Advanced
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SearchConnection;
