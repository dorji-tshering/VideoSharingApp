import { useNavigation } from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';


const Setting = ({ props }) => {
  const navigation = useNavigation();  

  return (
    <View style={styles.container}>
        <Button title="Logout" onPress={
          () => {
            navigation.dispatch(CommonActions.reset({
              index: 1,
              routes: [
                {name: 'Signin'},
              ],
            }));
          }} style={styles.input}/>
    </View>
  );
};
export default Setting;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});