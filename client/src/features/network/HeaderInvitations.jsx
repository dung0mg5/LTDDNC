import {Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import CustomBackIcon from '../../ui/CustomBackIcon';
import InvitationNavigation from './InvitationNavigation';

const Header = styled.View`
  height: 65px;
  flex-direction: row;
  margin-top: 50px;
  justify-content: space-around;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e9e9e9;
  background-color: #fff;
`;

const HeaderInvitations = ({onSetType}) => {
  return (
    <Header>
      <CustomBackIcon />
      <InvitationNavigation onSetType={onSetType} />
      <TouchableOpacity>
        <Image source={require('../../../assets/icons/settings.png')} />
      </TouchableOpacity>
    </Header>
  );
};

export default HeaderInvitations;
