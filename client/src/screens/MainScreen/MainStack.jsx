import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

export default function MainStack() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
          // drawerItemStyle: {
          //   display: 'none',
          // },
        }}
      />
    </Drawer.Navigator>
  );
}
