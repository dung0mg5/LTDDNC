import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useIsFocused} from '@react-navigation/native';
import {getConnections, getFollowingPeople} from '../services/apiNetwork';
import Spinner from '../ui/Spinner';

const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 22px;
`;

const StyledText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const Amount = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-right: 20px;
`;

function ManageNetworkScreen({navigation}) {
  const [connections, setConnections] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  async function fetchConnectionsAndFollowing() {
    setIsLoading(true);
    const {data: con} = await getConnections({page: 1, limit: 5});
    const {data: fol} = await getFollowingPeople({page: 1, limit: 5});

    setIsLoading(false);
    setConnections(con);
    setFollowing(fol);
  }

  useEffect(() => {
    if (isFocused) {
      fetchConnectionsAndFollowing();
    }
  }, [isFocused]);

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      {isLoading && <Spinner />}
      {connections.count > 0 && (
        <Row
          onPress={() =>
            navigation.navigate('connections', {
              connections: connections,
            })
          }>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 25,
            }}>
            <Image
              style={{
                tintColor: '#666',
              }}
              source={require('../../assets/icons/network.png')}
            />
            <StyledText>Connections</StyledText>
          </View>
          <Amount>{connections.count}</Amount>
        </Row>
      )}
      {following.count > 0 && (
        <Row
          onPress={() =>
            navigation.navigate('following-peoples', {
              following: following,
            })
          }
          style={{
            borderTopWidth: 1,
            borderColor: '#ddd',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 25,
            }}>
            <Image source={require('../../assets/icons/people.png')} />
            <StyledText>People | follow</StyledText>
          </View>
          <Amount>{following.count}</Amount>
        </Row>
      )}
    </View>
  );
}

export default ManageNetworkScreen;
