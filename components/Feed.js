import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useRef } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

let sharedVideos = null;

const Feed = ({ props }) => {
  const videoRef = useRef();
  const navigation = useNavigation();

  AsyncStorage.getItem('sharedVideos').then((videos) => {
    sharedVideos = JSON.parse(videos);
    console.log(`sharedVideos: ${sharedVideos}`)
  }).catch();

  if(sharedVideos === null){
    return (
      <Text>..Loading..</Text>
    )
  }

  return (
    <View style={{padding: 5, alignItems: 'center'}}>
    <ScrollView>
        <Text style={{
          width: Dimensions.get('screen').width,
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: 'aqua',
          padding: 5,
          marginBottom: 15,
        }}>{props.currentUser}'s Feed </Text>  
        {sharedVideos.map((source) => 
          <TouchableOpacity key={source} onPress={() => navigation.navigate('FeedVideo',{
            source: source,
          })}>
            <Image source={{uri: source}} style={{
              width: Dimensions.get('screen').width-5,
              height: 150,
              marginBottom: 25,
            }}/>
          </TouchableOpacity>
        )}
    </ScrollView>      
    </View>
  );
};
export default Feed;
