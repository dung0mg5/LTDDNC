import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import Invitations from '../features/network/Invitations';
import {useNavigation} from '@react-navigation/native';
import Spinner from '../ui/Spinner';
import useInvitations from '../features/network/useInvitations';
import React from 'react';

const Network = () => {
  const navigation = useNavigation();
  const {invitations, isLoading, confirmInvitation, rejectInvitation} =
    useInvitations({page: 1, limit: 3, type: 'Received'});

  return (
    <ScrollView
      style={{
        flexDirection: 'column',
      }}>
      {isLoading && <Spinner />}
      <TouchableOpacity
        onPress={() => navigation.navigate('invitations')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          padding: 20,
          borderTopColor: '#e9e9e9',
          borderTopWidth: 1,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
          }}>
          Invitation <Text>({invitations.count})</Text>
        </Text>
        <Image source={require('../../assets/icons/next.png')} />
      </TouchableOpacity>
      {invitations?.data?.length > 0 && (
        <Invitations
          invitations={invitations.data}
          onConfirmConnection={confirmInvitation}
          onRejectConnection={rejectInvitation}
          scroll={false}
        />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('manage-network')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          padding: 20,
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
          }}>
          Manage my network
        </Text>
        <Image source={require('../../assets/icons/next.png')} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Network;
