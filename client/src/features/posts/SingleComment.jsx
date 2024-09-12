import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {calculateTimeAgoV2} from '../../utils/helper';

function SingleComment({comment, post}) {
  console.log(comment);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingTop: 8,
        gap: 8,
      }}>
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#EAEAEA',
        }}
        source={{uri: comment.owner.avatar.url}}
      />

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '85%',
          backgroundColor: '#eaeaea',
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 700}}>
              {comment.owner.fullName}
            </Text>
            {comment.owner._id === post.owner._id && (
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#fff',
                  backgroundColor: '#5A6778',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRadius: 7,
                  overflow: 'hidden',
                }}>
                Author
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text style={{fontSize: 15, fontWeight: 600, color: '#666'}}>
              {calculateTimeAgoV2(comment.createdAt)}
            </Text>
            <Image source={require('../../../assets/icons/dot.png')} />
          </View>
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: '#666',
            marginTop: 2,
          }}>
          {comment.owner.headline}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginTop: 10,
          }}>
          {comment.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default SingleComment;
