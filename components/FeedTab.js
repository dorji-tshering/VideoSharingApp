import AsyncStorage from '@react-native-community/async-storage';
import React, { useRef } from 'react';
import { Text, View, Dimensions, Button } from 'react-native';
import  Video  from 'react-native-video';
import { createStackNavigator} from '@react-navigation/stack';
import Feed from './Feed';
import FeedVideo from './FeedVideo';

const Stack = createStackNavigator();

const FeedNavigator = ({props}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" children={() => <Feed props={props}/>} options={{
        headerShown: false,
      }}/>
      <Stack.Screen name="FeedVideo" component={FeedVideo} />
    </Stack.Navigator>
  );
}

const FeedTab = ({ props }) => {
  return (
    <FeedNavigator props={props} />
  );
};
export default FeedTab;
