import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'


const Login = ({ props }) => {
   const navigation = useNavigation();

  const onLogin = async() => {
    let users = await readData();
    for (let user of users){
        if (props.userName === user){
            let userObject = await AsyncStorage.getItem(props.userName);
            if (JSON.parse(userObject).password === props.password){
                props.setCurrentUser(props.userName);
                return true;
            } else {
                alert('Incorrect Password!');
                return false;
            }
        }
    }
    alert('User Does Not Exist!');
    return false;
  }

  // read stored user datas
  const readData = async() => {
    let users = await AsyncStorage.getAllKeys();
    return users;
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder={'username'} onChangeText={text => props.setUserName(text)}
            defaultValue={props.userName} style={styles.input}/>
      <TextInput placeholder={'password'} onChangeText={text => props.setPassword(text)}
            defaultValue={props.password} style={styles.input} />
      <Button title={'Login'} onPress={async()=>
          await onLogin() ? navigation.navigate('Main', {
            currentUser: props.userName,
          }) : navigation.navigate('Login')
      } style={styles.input}/>
      <Text/>
      <Button title={'Back'} onPress={() => navigation.navigate('Signin')} style={styles.input}/>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lawngreen',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 10,
  },
});
