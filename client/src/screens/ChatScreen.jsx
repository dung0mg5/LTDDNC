import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Chats from '../features/chats/Chats';
import styled from 'styled-components/native';
import CustomBackIcon from '../ui/CustomBackIcon';
import {useIsFocused} from '@react-navigation/native';

const Header = styled.View`
  height: 65px;
  flex-direction: row;
  margin-top: 50px;
  justify-content: space-around;
  align-items: center;
`;

const Nav = styled.TouchableOpacity`
  width: 195px;
  border-bottom-width: ${props => props.active === true && '1px'};
  border-bottom-color: ${props => props.active === true && '#347548'};
`;

const NavText = styled.Text`
  text-align: center;
  padding-bottom: 12px;
  color: ${props => (props.active === true ? '#347548' : '#666666')};
  font-weight: 700;
  font-size: 20px;
`;

function SearchMessage({
  search,
  onSetIsFocusedSearch,
  isFocusedSearch,
  inputSearch,
}) {
  return (
    <View
      style={{
        // width: !isFocusedSearch ? '65%' : '80%',
        width: '65%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EFF3F7',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            marginLeft: 10,
            width: 15,
            height: 15,
            tintColor: '#676767',
          }}
          source={require('../../assets/icons/lookup.png')}
        />
        <TextInput
          ref={inputSearch}
          // onFocus={() => onSetIsFocusedSearch(true)}
          style={{
            paddingLeft: 10,
            fontWeight: '500',
            width: '82%',
          }}
          placeholder="Search"
          placeholderTextColor="#5F6163"
          autoCapitalize="none"
          defaultValue={search}
        />
      </View>

      <TouchableOpacity
        style={{
          marginRight: 10,
        }}>
        <Image
          style={{
            width: 20,
            height: 20,
          }}
          source={require('../../assets/icons/options.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

function HeaderChat() {
  return (
    <Header>
      <CustomBackIcon />
      <SearchMessage />
      <TouchableOpacity>
        <Image source={require('../../assets/icons/dot.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={{
            width: 20,
            height: 20,
          }}
          source={require('../../assets/icons/message.png')}
        />
      </TouchableOpacity>
    </Header>
  );
}

function Navigation({type, onSetType}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      }}>
      <Nav onPress={() => onSetType('Focused')} active={type === 'Focused'}>
        <NavText active={type === 'Focused'}>Focused</NavText>
      </Nav>
      <Nav onPress={() => onSetType('Other')} active={type === 'Other'}>
        <NavText active={type === 'Other'}>Other</NavText>
      </Nav>
    </View>
  );
}

function ChatScreen() {
  const [type, setType] = useState('Focused');

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      <HeaderChat />
      <Navigation type={type} onSetType={setType} />
      <Chats type={type} />
    </View>
  );
}

export default ChatScreen;
