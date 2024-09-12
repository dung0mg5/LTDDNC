import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  withdrawSentConnection,
  getSentConnection,
} from '../../services/apiNetwork';
import {useIsFocused} from '@react-navigation/native';

function useSentInvitations({page, limit, type}) {
  const [sentInvitations, setSentInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  async function fetchSentConnection(next = 0) {
    setIsLoading(true);
    const {data} = await getSentConnection({page: page + next, limit});
    setIsLoading(false);
    setSentInvitations(data);
  }

  async function withdrawInvitation(connectionId) {
    setIsLoading(true);
    await withdrawSentConnection({connectionId: connectionId});
    await fetchSentConnection();
    setIsLoading(false);
  }

  useEffect(() => {
    if (isFocused && type === 'Sent') {
      fetchSentConnection();
    }
  }, [isFocused, type]);

  return {
    sentInvitations,
    isLoading,
    fetchSentConnection,
    withdrawInvitation,
  };
}

export default useSentInvitations;
