/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useAuth} from '../context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import {getNotifications} from '../services/apiNotification';
import SingleNotification from './SingleNotification';

const Notification = () => {
  const [notifications, setNotification] = useState([]);
  const {socket} = useAuth();
  const isFocused = useIsFocused();

  console.log(notifications);

  async function doGetNotifications() {
    const {data} = await getNotifications();

    setNotification(data.data);
  }

  useEffect(() => {
    socket.on('notification-received', data => {
      console.log(data);
      setNotification([data, ...notifications]);
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      doGetNotifications();
    }
  }, [isFocused]);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        borderTopColor: '#eaeaea',
        borderTopWidth: 1,
      }}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={({item}) => <SingleNotification notification={item} />}
        />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 25,
          }}>
          No notification
        </Text>
      )}
    </View>
  );
};

export default Notification;
