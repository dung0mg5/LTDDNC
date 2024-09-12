import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {calculateTimeAgo} from '../../utils/helper';

const SingleSentInvitation = ({
  sentInvitation,
  onWithdrawSentConnection,
  onFetchSentConnection,
}) => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderColor: '#e9e9e9',
        paddingVertical: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          marginLeft: 10,
        }}>
        <Image
          source={{
            uri: sentInvitation?.recipient.avatar.url,
          }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            borderWidth: 1,
            borderColor: '#e9e9e9',
            overflow: 'hidden',
            margin: 10,
          }}
        />
        <View
          style={{
            width: 180,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 18,
            }}>
            {sentInvitation?.recipient.fullName}
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 15,
            }}>
            {/* Fullstack Engineering at abc xyz */}
            {sentInvitation?.recipient.experiences[0].headline}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#666666',
              fontWeight: '500',
              marginTop: 5,
            }}>
            {calculateTimeAgo(sentInvitation?.createdAt)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onWithdrawSentConnection(sentInvitation?._id);
          }}>
          <Text
            style={{
              color: '#676767',
              fontWeight: '800',
              fontSize: 20,
              marginLeft: 15,
            }}>
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleSentInvitation;
