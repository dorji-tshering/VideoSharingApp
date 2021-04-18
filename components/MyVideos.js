import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useRef } from 'react';
import { Text, View, ScrollView, Image, Button, TouchableOpacity, Dimensions } from 'react-native';


let user = null;

const MyVideos = ({ props }) => {
  const videoRef = useRef();
  const navigation = useNavigation();

  AsyncStorage.getItem(props.currentUser).then((userObject) => {
    user = JSON.parse(userObject);
  }).catch();

  if(user === null){
    return (
      <Text>..loading</Text>
    )
  }else{
    console.log(user.videos);
  }
  

  return (
    <View style={{padding: 5, alignItems: 'center'}}>
    <ScrollView>    
    <Text style={{
      width: Dimensions.get('screen').width,
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: 'aqua',
      textAlign: 'center',
      padding: 5,
      marginBottom: 15,
    }}>{props.currentUser}'s Videos</Text>  
    {user.videos.map((source) => 
      <TouchableOpacity key={source} onPress={() => navigation.navigate('MyVideo',{
        source: source,
        currentUser: props.currentUser,
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
export default MyVideos;
