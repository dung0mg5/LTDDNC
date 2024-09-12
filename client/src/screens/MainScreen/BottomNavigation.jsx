/* eslint-disable react-hooks/exhaustive-deps */
import React, {Suspense, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Posts from '../../features/posts/Posts';
import NetworkScreen from '../NetworkScreen';
import CreatePost from '../../features/posts/CreatePost';
import NotificationScreen from '../NotificationScreen';
import Jobs from '../../features/jobs/Jobs';
import SingleTab from './SingleTab';
import {useNavigation} from '@react-navigation/native';
import ListSearch from '../../features/search/ListSearch';

const Tab = createBottomTabNavigator();

function BottomNavigation({onSetCurrentScreen}) {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#ffffff',
          elevation: 0,
          height: 80,
        },
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'home') {
            return (
              <SingleTab
                type="home"
                color={focused ? '#000' : '#8C8C8C'}
                selected={focused}
              />
            );
          } else if (route.name === 'network') {
            return (
              <SingleTab
                type="network"
                color={focused ? '#000' : '#8C8C8C'}
                selected={focused}
              />
            );
          } else if (route.name === 'post') {
            return (
              <SingleTab
                type="post"
                color={focused ? '#000' : '#8C8C8C'}
                selected={focused}
              />
            );
          } else if (route.name === 'notification') {
            return (
              <SingleTab
                type="notification"
                color={focused ? '#000' : '#8C8C8C'}
                selected={focused}
              />
            );
          } else if (route.name === 'job') {
            return (
              <SingleTab
                type="job"
                color={focused ? '#000' : '#8C8C8C'}
                selected={focused}
              />
            );
          }
        },
      })}>
      <Tab.Screen
        name="home"
        component={Posts}
        listeners={{
          tabPress: () => onSetCurrentScreen('home'),
        }}
      />
      <Tab.Screen
        name="network"
        component={NetworkScreen}
        listeners={{
          tabPress: () => onSetCurrentScreen('network'),
        }}
      />
      <Tab.Screen
        name="post"
        component={CreatePost}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('create-post');
          },
        })}
      />
      <Tab.Screen
        name="notification"
        component={NotificationScreen}
        listeners={{
          tabPress: () => onSetCurrentScreen('notification'),
        }}
      />
      <Tab.Screen
        name="job"
        component={Jobs}
        listeners={{
          tabPress: () => onSetCurrentScreen('job'),
        }}
      />
      <Tab.Screen
        name="search"
        component={ListSearch}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
