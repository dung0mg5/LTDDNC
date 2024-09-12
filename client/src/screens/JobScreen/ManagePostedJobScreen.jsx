import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SingleAppliedUser from './SingleAppliedUser';

export default function ManagePostedJobScreen({route}) {
  const {job} = route.params;

  return (
    <View
      style={{
        borderTopColor: '#EAEAEA',
        borderTopWidth: 1,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            fontSize: 25,
            fontWeight: 700,
          }}>
          Job performance
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              marginLeft: 20,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#000',
              }}>
              5
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 5,
                fontWeight: 600,
                color: '#666',
              }}>
              Applicants
            </Text>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 10,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#000',
              }}>
              5
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 5,
                fontWeight: 600,
                color: '#666',
              }}>
              Views
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          marginTop: 10,
        }}>
        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            fontSize: 25,
            fontWeight: 700,
          }}>
          Applicants
        </Text>
        <FlatList
          data={job.applicants}
          style={{
            marginLeft: 12,
            marginTop: 20,
          }}
          renderItem={({item}) => <SingleAppliedUser appliedUser={item} />}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}
