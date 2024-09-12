import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SingleSentInvitation from './SingleSentInvitation';

function SentInvitations({sentInvitations, onWithdrawSentConnection}) {
  return (
    <FlatList
      data={sentInvitations}
      renderItem={({item}) => (
        <SingleSentInvitation
          sentInvitation={item}
          onWithdrawSentConnection={onWithdrawSentConnection}
        />
      )}
    />
  );
}

export default SentInvitations;
