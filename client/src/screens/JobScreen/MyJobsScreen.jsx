import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SingleJob from '../../features/jobs/SingleJob';
import SinglePostedJob from '../../features/jobs/SinglePostedJob';
import {getPostedJobs} from '../../services/apiJob';
import Spinner from '../../ui/Spinner';

export default function MyJobsScreen() {
  const [postedJob, setPostedJob] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPostedJob() {
    setIsLoading(true);
    const {data} = await getPostedJobs();

    if (data) {
      setPostedJob(data.data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPostedJob();
  }, []);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderTopColor: '#EAEAEA',
        borderTopWidth: 1,
        flex: 1,
      }}>
      {isLoading && <Spinner />}
      <FlatList
        data={postedJob}
        style={{
          marginLeft: 12,
          marginTop: 10,
        }}
        renderItem={({item}) => <SinglePostedJob job={item} />}
        scrollEnabled={false}
      />
    </View>
  );
}
