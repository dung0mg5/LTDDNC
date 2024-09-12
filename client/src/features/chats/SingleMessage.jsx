import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
// import VideoPlayer from 'react-native-video-player';
import {formatTime} from '../../utils/helper';

function compareDateWithToday(date) {
  const today = new Date();
  let messageDate = new Date(date);

  if (
    today.getDate() === messageDate.getDate() &&
    today.getMonth() === messageDate.getMonth() &&
    today.getFullYear() === messageDate.getFullYear()
  )
    return {isToday: true};

  return {
    isToday: false,
    date: Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(messageDate),
  };
}

function SingleMessage({message, index}) {
  return (
    <>
      {index === 0 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#EAEAEA',
              marginRight: 5,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                fontWeight: '800',
                letterSpacing: 1.4,
              }}>
              {compareDateWithToday(message.createdAt).isToday
                ? 'Today'
                : compareDateWithToday(message.createdAt).date}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#EAEAEA',
              marginLeft: 5,
            }}
          />
        </View>
      )}
      <Pressable
        style={{
          flexDirection: 'row',
          gap: 5,
          marginTop: 15,
          marginHorizontal: 10,
        }}>
        <Image
          style={{
            width: 35,
            height: 35,
            borderRadius: 17,
          }}
          source={require('../../../assets/images/uploadAvatar.png')}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Text
              style={{
                fontSize: 19,
                fontWeight: 700,
              }}>
              {message.sender.fullName}
            </Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 50,
                backgroundColor: '#6C6C6C',
              }}
            />
            <Text
              style={{
                color: '#666',
                fontWeight: 600,
              }}>
              {formatTime(message.createdAt).toLowerCase()}
            </Text>
          </View>
          <View>
            {message.media && message.media.resource_type === 'image' ? (
              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#EAEAEA',
                  marginTop: 10,
                }}
                source={{uri: message.media.url}}
              />
            ) : null}
            {/* {message.media && message.media.resource_type === 'video' ? (
              <View>
                <VideoPlayer
                  video={require('./example.mp4')}
                  videoWidth={200}
                  videoHeight={200}
                  defaultMuted={true}
                  autoplay={false}
                  loop={false}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#EAEAEA',
                    marginTop: 10,
                  }}
                />
              </View>
            ) : null} */}

            <Text
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#666',
                marginTop: 10,
              }}>
              {message.content}
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}

export default SingleMessage;
