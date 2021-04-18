import React, { useState } from 'react';
import Videos from './Videos';
import Record from './Record';
import Setting from './Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedTab from './FeedTab';

const Tab = createBottomTabNavigator();

function MyTabs(props) {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: 'black',
      inactiveTintColor: 'tomato',
      activeBackgroundColor: 'tomato',
      inactiveBackgroundColor: 'lightblue',
      labelStyle: {
        fontSize: 17,
        padding: 7,
      },
    }}>
      <Tab.Screen name="Feed" children={() => <FeedTab props={props} />} />
      <Tab.Screen name="Videos" children={() =><Videos props={props} />} />
      <Tab.Screen name="Record" children={() => <Record props={props} />} />
      <Tab.Screen name="Settings" children={() => <Setting props={props}/> } />
    </Tab.Navigator>
  );
}

const Main = ({ route }) => {
  const { currentUser } = route.params;

  return (
    <MyTabs currentUser={currentUser} />
  );
};
export default Main;
