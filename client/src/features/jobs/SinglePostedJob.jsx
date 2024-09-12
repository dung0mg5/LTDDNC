import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {calculateTimeAgo} from '../../utils/helper';
import {useNavigation} from '@react-navigation/native';

export default function SinglePostedJob({job}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('manage-posted-jobs', {job})}
      style={{
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        paddingVertical: 15,
        flexDirection: 'row',
        gap: 10,
      }}>
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        source={{
          uri: job.company.avatar.url,
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          gap: 5,
        }}>
        <Text style={{fontSize: 20, fontWeight: 700}}>{job.jobTitle}</Text>
        <Text style={{fontSize: 16, fontWeight: 600}}>{job.company.name}</Text>
        <Text style={{fontSize: 16, fontWeight: 500, color: '#666'}}>
          {job.jobLocation} <Text>({job.workplaceType})</Text>
        </Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 500, color: '#666'}}>
            Posted {calculateTimeAgo(job.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
