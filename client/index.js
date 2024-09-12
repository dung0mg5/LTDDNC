import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import AuthProvider from './src/context/AuthContext';
import ChatProvider from './src/context/ChatContext';

function WrappedApp() {
  return (
    <AuthProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthProvider>
  );
}
AppRegistry.registerComponent(appName, () => WrappedApp);
