import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  confirmPendingConnection,
  getPendingConnection,
  rejectPendingConnection,
} from '../../services/apiNetwork';
import {useIsFocused} from '@react-navigation/native';

function useInvitations({page, limit, type}) {
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  async function fetchPendingConnection(next = 0) {
    setIsLoading(true);
    const {data} = await getPendingConnection({page: page + next, limit});
    setIsLoading(false);
    setInvitations(data);
    // setInvitations(prevData => {
    //   return {
    //     count: (prevData.data?.length > 0 ? prevData.count : 0) + data.count,
    //     data: (prevData.data?.length > 0 ? prevData.data : []).concat(
    //       data.data,
    //     ),
    //   };
    // });
  }

  async function confirmInvitation(connectionId) {
    setIsLoading(true);
    await confirmPendingConnection({connectionId: connectionId});
    await fetchPendingConnection();
    setIsLoading(false);
  }

  async function rejectInvitation(connectionId) {
    setIsLoading(true);
    await rejectPendingConnection({connectionId: connectionId});
    await fetchPendingConnection();
    setIsLoading(false);
  }

  useEffect(() => {
    if (isFocused && type === 'Received') {
      fetchPendingConnection();
    }
  }, [isFocused, type]);

  return {
    invitations,
    isLoading,
    confirmInvitation,
    rejectInvitation,
    fetchPendingConnection,
  };
}

export default useInvitations;
