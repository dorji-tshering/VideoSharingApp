import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useRef } from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import  Video  from 'react-native-video';
import { VESDK } from 'react-native-videoeditorsdk';


const MyVideo = ({ route }) => {
  const videoRef = useRef();
  const navigation = useNavigation();

  const { source, currentUser } = route.params;
  console.log("source" + source);

  // edit video
  const editVideo = async() => {
      let result = await VESDK.openEditor(source);
      if(result === null){
        return;
      }else{
        AsyncStorage.getItem(currentUser).then((userObject) => {
          let user = {
            password: JSON.parse(userObject).password,
            videos: [...JSON.parse(userObject).videos, result.video]
          }
        AsyncStorage.setItem(currentUser, JSON.stringify(user)).catch();
        }).catch()
      }
  }

  //delete Video
  const deleteVideo = async() => {
    try {
      let userObject = await AsyncStorage.getItem(currentUser);
      let user = JSON.parse(userObject);
      let videoIdx = user.videos.indexOf(source);
      user.videos.splice(videoIdx, 1);
      let user_ = {
        password: user.password,
        videos: [...user.videos],
      }
      await AsyncStorage.setItem(currentUser, JSON.stringify(user_));
      alert('Video deleted.');
    }catch(e){console.log(e)}
  }

  // share video
  const shareVideo = async() => {
    try{
      let sharedVideos = await AsyncStorage.getItem('sharedVideos');
      await AsyncStorage.setItem('sharedVideos', 
      JSON.stringify([...JSON.parse(sharedVideos), source]));
      alert('Video shared successfully!');
     }catch(e){}
  }

  return (
    <View style={{padding: 7, paddingTop: 60}}>
    <View style={{alignItems: 'center'}}>
    <Video source={{
      uri: source,
    }} style={{
      width: Dimensions.get('screen').width,
      height: 300,
    }} controls={true}
    ref={videoRef}
    />
    </View>
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    }}>
    <Button title="Edit" onPress={async() => await editVideo()} />
    <Button title="delete" onPress={async() => {
      await deleteVideo();
      navigation.navigate('MyVideos');
    }}/>
    <Button title="Share" onPress={async() => await shareVideo()}/>
    </View>
    </View>
  );
};
export default MyVideo;
