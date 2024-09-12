import {FlatList, Text, View} from 'react-native';
import React, {useState} from 'react';
import SingleFollowingPeople from '../features/network/SingleFollowingPeople';

function PeopleFollowScreen({route}) {
  const {following: follow} = route.params;
  const [following, setFollowing] = useState(follow);

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          borderColor: '#e9e9e9',
          borderBottomWidth: 1,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: '#666',
            fontWeight: '600',
          }}>
          {following.count} person
        </Text>
      </View>
      <FlatList
        data={following.data}
        renderItem={({item}) => <SingleFollowingPeople following={item} />}
      />
    </View>
  );
}

export default PeopleFollowScreen;
