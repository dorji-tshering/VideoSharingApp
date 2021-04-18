import AsyncStorage from '@react-native-community/async-storage';
import React, { useRef } from 'react';
import { Text, View, Dimensions, Button } from 'react-native';
import  Video  from 'react-native-video';
import { createStackNavigator} from '@react-navigation/stack';
import MyVideos from './MyVideos';
import MyVideo from './Video';

const Stack = createStackNavigator();

const VideoNavigator = ({props}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyVideos" children={() => <MyVideos props={props}/>} options={{
        headerShown: false,
      }}/>
      <Stack.Screen name="MyVideo" component={MyVideo} />
    </Stack.Navigator>
  );
}

const Videos = ({ props }) => {
  return (
    <VideoNavigator props={props} />
  );
};
export default Videos;
