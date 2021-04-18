import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'


const Signin = ({props}) => {  
  const navigation = useNavigation();

  const onSignin = async () => {
    if(props.userName === "" || props.password === ""){
      alert('Enter valid username or password');
      return;
    }
    let users = await readData();

    for (let user of users){
      if (user === props.userName){
        alert('User Already Exist');
        return false;
      }
    }

    try {
      let userObject = {
        password: props.password,
        videos: [],
      }
      await AsyncStorage.setItem(props.userName, JSON.stringify(userObject));
      props.setCurrentUser(props.userName);
      return true;
    } catch (error) {
      console.log(error);
    }

    };

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
      <Button title={'Signin'} onPress={async()=>
        await onSignin() ? navigation.navigate('Main', {
          currentUser: props.userName,
        }) : navigation.navigate('Signin')
      } />
      <Text/>
      <Text style={{fontStyle: 'italic'}}>Already have an account?</Text>
      <Button title={'Login'} onPress={() => navigation.navigate('Login')} style={styles.input} />
    </View>
  );
};
export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'chartreuse',
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
