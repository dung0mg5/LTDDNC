/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SingleJob from './SingleJob';
import ModalDetailJob from './ModalDetailJob';
import {searchJob} from '../../services/apiJob';
import useLogin from '../authentication/useLogin';
import MiniSpinner from '../../ui/MiniSpinner';
import {useIsFocused} from '@react-navigation/native';

const Jobs = () => {
  const [modalDetailJob, setModalDetailJob] = useState(false);
  const [suggestJobs, setSuggestJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {profile} = useLogin();
  const isFocused = useIsFocused();

  async function getMoreJobs() {
    setIsLoading(true);
    const {data} = await searchJob({
      jobLocation: profile.user.authenticatedUser.location,
      jobTitle: '',
    });

    setSuggestJobs(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getMoreJobs();
  }, [isFocused]);

  return (
    <>
      <ModalDetailJob
        modalVisible={modalDetailJob}
        onSetModalVisible={setModalDetailJob}
        selectedJob={selectedJob}
        onSetSelectedJob={setSelectedJob}
      />
      <ScrollView
        style={{
          backgroundColor: '#fff',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '700',
            marginLeft: 15,
            marginTop: 15,
          }}>
          More jobs for you
        </Text>
        {isLoading ? (
          <MiniSpinner />
        ) : (
          <>
            <FlatList
              data={suggestJobs}
              style={{
                marginLeft: 12,
                marginTop: 10,
              }}
              renderItem={({item}) => (
                <SingleJob
                  job={item}
                  onSetModalVisible={setModalDetailJob}
                  onSetSelectedJob={setSelectedJob}
                />
              )}
              scrollEnabled={false}
            />
            <TouchableOpacity
              style={{
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#666',
                }}>
                Show all
              </Text>
              <Image source={require('../../../assets/icons/next.png')} />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Jobs;
