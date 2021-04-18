import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import  Video  from 'react-native-video';
import {VESDK, VideoEditorModal, Configuration} from 'react-native-videoeditorsdk';


const FeedVideo = ({ route }) => {
  const videoRef = useRef();
  const navigation = useNavigation();

  const { source } = route.params;

  return (
    <View style={{padding: 7, alignItems: 'center', paddingTop: 40}}>
    <Video source={{
      uri: source,
    }} style={{
      width: 300,
      height: 300,
    }} controls={true}
    ref={videoRef}
    />
    <Text/>
    <Button title="Back" onPress={() => navigation.navigate('Feed')}/>
    </View>
  );
};
export default FeedVideo;
