/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SinglePostedJob from '../../features/jobs/SinglePostedJob';
import {getPostedJobs, searchJob} from '../../services/apiJob';
import Spinner from '../../ui/Spinner';

export default function ListSearchJobScreen({route}) {
  const [postedJob, setPostedJob] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {search} = route.params;

  async function fetchJob() {
    setIsLoading(true);
    const {data} = await searchJob({jobTitle: search, jobLocation: ''});

    if (data) {
      setPostedJob(data.data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchJob();
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
