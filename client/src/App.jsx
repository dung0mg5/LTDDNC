import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Notifications from './ui/Toast';
import Home from './screens/HomeScreen/Home';
import LoginScreen from './screens/LoginScreen';
import MainStack from './screens/MainScreen/MainStack';
import SettingScreen from './screens/SettingScreen';
import GroupScreen from './screens/GroupScreen';
import CreatePost from './features/posts/CreatePost';
import InvitationScreen from './screens/InvitationScreen';
import ManageNetworkScreen from './screens/ManageNetworkScreen';
import CustomBackIcon from './ui/CustomBackIcon';
import ConnectionScreen from './screens/ConnectionScreen';
import PeopleFollowScreen from './screens/PeopleFollowScreen';
import ForgotPasswordTabNavigator from './screens/ForgotPasswordScreen/ForgotPasswordTabNavigator';
import SignUpTabNavigator from './screens/UserScreen/SignUpTabNavigator';
import ChatScreen from './screens/ChatScreen';
import MessageScreen from './screens/MessageScreen';
import CommentScreen from './screens/CommentScreen';
import ProfileTabNavigator from './screens/ProfileScreen/ProfileTabNavigator';
import CreateJobCriteriaScreen from './screens/JobScreen/CreateJobCriteriaScreen';
import CreateJobScreen from './screens/JobScreen/CreateJobScreen';
import ApplyScreen from './screens/JobScreen/ApplyScreen';
import UploadResume from './screens/JobScreen/UploadResumeScreen';
import MyJobsScreen from './screens/JobScreen/MyJobsScreen';
import ManagePostedJobScreen from './screens/JobScreen/ManagePostedJobScreen';
import InfoAppliedUserScreen from './screens/JobScreen/InfoAppliedUserScreen';
import ListSearchJobScreen from './screens/JobScreen/ListSearchJobScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // SplashScreen.hide();

  // const config = {
  //   screens: {
  //     home: 'home',
  //     login: 'login',
  //     profile: 'profile',
  //     main: 'main',
  //     forgot: 'forgot',
  //     otp: 'otp',
  //     confirm: 'confirm',
  //     'signup-name': 'signup-name',
  //     'signup-email': 'signup-email',
  //     'signup-location': 'signup-location',
  //     'signup-profile': 'signup-profile',
  //     'signup-avatar': 'signup-avatar',
  //     'signup-verification': 'signup-verification',
  //   },
  // };

  // const linking = {
  //   prefixes: ['socialjob://', 'https://socialjob.com'],
  //   config,
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="profile" component={ProfileTabNavigator} />
        <Stack.Screen name="forgot" component={ForgotPasswordTabNavigator} />
        <Stack.Screen name="signup" component={SignUpTabNavigator} />

        <Stack.Screen name="main" component={MainStack} />
        <Stack.Screen name="chat" component={ChatScreen} />
        <Stack.Screen name="message" component={MessageScreen} />
        <Stack.Screen name="settings" component={SettingScreen} />
        <Stack.Screen name="group" component={GroupScreen} />
        <Stack.Screen name="create-post" component={CreatePost} />
        <Stack.Screen
          name="create-job"
          component={CreateJobScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerLeft: () => <CustomBackIcon icon="close" />,
            title: '',
          }}
        />
        <Stack.Screen
          name="my-jobs"
          component={MyJobsScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerLeft: () => <CustomBackIcon />,
            title: 'My Jobs',
            headerTitleStyle: {fontSize: 20, fontWeight: '700'},
          }}
        />
        <Stack.Screen
          name="list-job"
          component={ListSearchJobScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerLeft: () => <CustomBackIcon />,
            title: 'List Job',
            headerTitleStyle: {fontSize: 20, fontWeight: '700'},
          }}
        />
        <Stack.Screen
          name="manage-posted-jobs"
          component={ManagePostedJobScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerLeft: () => <CustomBackIcon />,
            title: 'Manage Jobs',
            headerTitleStyle: {fontSize: 20, fontWeight: '700'},
          }}
        />
        <Stack.Screen
          name="info-applied-user"
          component={InfoAppliedUserScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerLeft: () => <CustomBackIcon />,
            title: 'Info Applied User',
            headerTitleStyle: {fontSize: 20, fontWeight: '700'},
          }}
        />
        <Stack.Screen
          name="create-job-criteria"
          component={CreateJobCriteriaScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false, // applied here
            headerLeft: () => <CustomBackIcon />,
            title: '',
          }}
        />
        <Stack.Screen
          name="apply-job"
          component={ApplyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="upload-resume"
          component={UploadResume}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="invitations" component={InvitationScreen} />
        <Stack.Screen
          name="comment"
          component={CommentScreen}
          options={{
            headerShown: true,
            headerLeft: () => <CustomBackIcon />,
            title: '',
          }}
        />
        <Stack.Screen
          name="manage-network"
          component={ManageNetworkScreen}
          options={{
            headerShown: true,
            title: 'Manage my network',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 20, fontWeight: '700'},
            headerLeft: () => <CustomBackIcon />,
          }}
        />
        <Stack.Screen
          name="connections"
          component={ConnectionScreen}
          options={{
            headerShown: true,
            title: 'Connections',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 20, fontWeight: '700'},
            headerLeft: () => <CustomBackIcon />,
          }}
        />
        <Stack.Screen
          name="following-peoples"
          component={PeopleFollowScreen}
          options={{
            headerShown: true,
            title: 'People | follow',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 20, fontWeight: '700'},
            headerLeft: () => <CustomBackIcon />,
          }}
        />
      </Stack.Navigator>
      <Notifications />
    </NavigationContainer>
  );
}
