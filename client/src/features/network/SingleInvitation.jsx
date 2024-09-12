import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {calculateTimeAgo} from '../../utils/helper';

const SingleInvitation = ({
  invitation,
  onRejectConnection,
  onConfirmConnection,
}) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 1);
  }, []);

  function toggleNumberOfLines() {
    setTextShown(!textShown);
  }

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
            uri: invitation?.recipient.avatar.url,
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
            {invitation?.recipient.fullName}
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 15,
            }}>
            {/* Fullstack Engineering at abc xyz */}
            {invitation?.recipient.experiences[0].headline}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#666666',
              fontWeight: '500',
              marginTop: 5,
            }}>
            {calculateTimeAgo(invitation?.createdAt)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => onRejectConnection(invitation._id)}>
            <Image source={require('../../../assets/icons/reject.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onConfirmConnection(invitation._id)}>
            <Image source={require('../../../assets/icons/confirm.png')} />
          </TouchableOpacity>
        </View>
      </View>
      {invitation?.note && (
        <View
          style={{
            borderWidth: 3,
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderColor: '#EBEBEB',
            borderRadius: 5,
            marginLeft: 20,
            marginRight: 20,
          }}>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 1}
            style={{
              fontSize: 18,
              fontWeight: '600',
              lineHeight: 21,
            }}>
            {invitation.note}
          </Text>
          {lengthMore ? (
            <TouchableOpacity onPress={toggleNumberOfLines}>
              <Text
                style={{
                  lineHeight: 21,
                  position: 'absolute',
                  right: 0,
                  top: -21,
                  fontSize: 18,
                  color: '#666666',
                  fontWeight: '800',
                  backgroundColor: 'white',
                }}>
                {!textShown && '...Show more'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default SingleInvitation;
