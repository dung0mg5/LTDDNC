import {View} from 'react-native';
import React, {useState} from 'react';
import SentNavigation from '../features/network/SentNavigation';
import ReceivedNavigation from '../features/network/ReceivedNavigation';
import HeaderInvitations from '../features/network/HeaderInvitations';

import Invitations from '../features/network/Invitations';
import useInvitations from '../features/network/useInvitations';
import SentInvitations from '../features/network/SentInvitations';
import useSentInvitations from '../features/network/useSentInvitations';
import Spinner from '../ui/Spinner';

function InvitationScreen() {
  const [type, setType] = useState('Received');
  const {
    invitations,
    isLoading: isLoadingInvitations,
    fetchPendingConnection,
    confirmInvitation,
    rejectInvitation,
  } = useInvitations({page: 1, limit: 20, type});

  const {
    sentInvitations,
    isLoading: isLoadingSentInvitations,
    fetchSentConnection,
    withdrawInvitation,
  } = useSentInvitations({page: 1, limit: 20, type});

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      {(isLoadingInvitations || isLoadingSentInvitations) && <Spinner />}
      <HeaderInvitations onSetType={setType} />
      {type === 'Received' ? (
        <ReceivedNavigation invitations={invitations} />
      ) : (
        <SentNavigation sentInvitations={sentInvitations} />
      )}

      {type === 'Received' && invitations?.data?.length > 0 && (
        <Invitations
          invitations={invitations.data}
          onConfirmConnection={confirmInvitation}
          onRejectConnection={rejectInvitation}
          onFetchPendingConnection={fetchPendingConnection}
          scroll={true}
        />
      )}

      {type === 'Sent' && sentInvitations?.data?.length > 0 && (
        <SentInvitations
          sentInvitations={sentInvitations.data}
          onWithdrawSentConnection={withdrawInvitation}
        />
      )}
    </View>
  );
}

export default InvitationScreen;
