import AsyncStorage from '@react-native-community/async-storage';
import React, { useRef, useState } from 'react';
import {Button, Text} from 'react-native';
import { RNCamera } from 'react-native-camera';

let user = null;

const Record = ({ props }) => {
  const cameraRef = useRef(null);
  const [isVideoRecording, setIsVideoRecording] = useState(false);

  AsyncStorage.getItem(props.currentUser).then((userObject) => {
    user = JSON.parse(userObject);
  }).catch()

    const recordVideo = async() => {
      
        if (cameraRef.current) {
            try {
              setIsVideoRecording(true);
              setTimeout(() => {
                setIsVideoRecording(false);
              }, 60000);
              const videoRecordPromise = cameraRef.current.recordAsync({
                maxDuration: 60,
              });
              if (videoRecordPromise) {
                const data = await videoRecordPromise;
                const source = data.uri;
                if (source) {
                  let userObject = {
                      password: user.password,
                      videos: [...user.videos, source]
                    }
                    await AsyncStorage.setItem(props.currentUser, JSON.stringify(userObject));
                  }
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    const stopVideoRecording = () => {
      if (cameraRef.current) {
          setIsVideoRecording(false);
          cameraRef.current.stopRecording();
      }
  }

  if(user === null){
    return (
      <Text>..just a minute</Text>
    )
  }

  return (
    <>
    <RNCamera
    ref={cameraRef}
    type={RNCamera.Constants.Type.back}
    captureAudio={true}
    style={{flex: 1}}
    flashMode={RNCamera.Constants.FlashMode.off}
    androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
    />
    {isVideoRecording ? <Button title="STOP" onPress={stopVideoRecording} />
         : <Button title="START" onPress={recordVideo} />}
    </>
  );
};
export default Record;
