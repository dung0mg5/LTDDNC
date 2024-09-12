import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import toast from 'react-hot-toast/headless';
import {followUser, unfollowUser} from '../../services/apiNetwork';

const SingleFollowingPeople = ({following}) => {
  const [isFollow, setIsFollow] = useState(true);

  async function handleUnfollowUser() {
    const {data, errorMessage} = await unfollowUser({userId: following._id});
    if (errorMessage) {
      return toast.error(errorMessage);
    }

    setIsFollow(false);
    return toast.success(data.message);
  }

  async function handleFollowUser() {
    const {data, errorMessage} = await followUser({userId: following._id});
    if (errorMessage) {
      return toast.error(errorMessage);
    }

    setIsFollow(true);
    return toast.success(data.message);
  }

  return (
    <View
      style={{
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#e9e9e9',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: following.avatar.url}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: '#e9e9e9',
              overflow: 'hidden',
              marginRight: 10,
              marginLeft: 10,
            }}
          />
          <View
            style={{
              width: 200,
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
              }}>
              {following.fullName}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
              }}>
              {following.experiences[0].headline}
            </Text>
          </View>
        </View>
        {isFollow ? (
          <TouchableOpacity
            onPress={handleUnfollowUser}
            style={{
              borderWidth: 1,
              borderColor: '#666',
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 30,
              marginRight: 15,
            }}>
            <Text
              style={{
                color: '#666',
                fontWeight: '800',
                fontSize: 18,
              }}>
              Following
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleFollowUser}
            style={{
              borderWidth: 1,
              borderColor: '#2D64BC',
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 30,
              marginRight: 15,
            }}>
            <Text
              style={{
                color: '#2D64BC',
                fontWeight: '800',
                fontSize: 18,
              }}>
              Follow
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SingleFollowingPeople;
