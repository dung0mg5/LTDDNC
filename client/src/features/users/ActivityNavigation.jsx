import React, {useState} from 'react';
import SingleActivityTab from './SingleActivityTab';
import ActivityPost from './ActivityPost';
import ActivityComment from './ActivityComment';
import {ScrollView, TouchableOpacity, Text, Image} from 'react-native';

export default function ActivityNavigation({posts}) {
  const [isActive, setIsActive] = useState('Posts');

  return (
    <>
      <ScrollView
        horizontal={true}
        style={{
          marginLeft: 20,
        }}>
        <SingleActivityTab isActive={isActive} onSetIsActive={setIsActive}>
          Posts
        </SingleActivityTab>
        <SingleActivityTab isActive={isActive} onSetIsActive={setIsActive}>
          Comments
        </SingleActivityTab>
      </ScrollView>
      {isActive === 'Posts' && <ActivityPost posts={posts} />}
      {isActive === 'Comments' && <ActivityComment />}
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
          {`Show all ${isActive.toLowerCase()}`}
        </Text>
        <Image source={require('../../../assets/icons/next.png')} />
      </TouchableOpacity>
    </>
  );
}

{
}
