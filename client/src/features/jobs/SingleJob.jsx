import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function SingleJob({job, onSetModalVisible, onSetSelectedJob}) {
  return (
    <TouchableOpacity
      onPress={() => {
        onSetModalVisible(true);
        onSetSelectedJob(job);
      }}
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
        {job.activelyRecruiting && (
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/icons/actively-recruiting.png')}
            />
            <Text style={{fontSize: 16, fontWeight: 500, color: '#666'}}>
              Actively recruiting
            </Text>
          </View>
        )}
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          {/* <Text style={{fontSize: 16, fontWeight: 600, color: '#666'}}>
            {job.promoted ? 'Promoted' : 'Not promoted'}
          </Text> */}
          <Text style={{fontSize: 16, fontWeight: 600, color: '#38764A'}}>
            {job.applicants.length} applicants
          </Text>
          <View
            style={{
              width: 3,
              height: 3,
              borderRadius: 50,
              backgroundColor: '#000',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={require('../../../assets/icons/main.png')}
            />
            <Text>Easy Apply</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
