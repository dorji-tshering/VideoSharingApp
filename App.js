import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Signin from './components/Signin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Login from './components/Login';
import Main from './components/Main';
import AsyncStorage from '@react-native-community/async-storage';


const Stack = createStackNavigator();

const AppNavigator = (props) => {
    return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="Signin" children={() => <Signin props={props} />} />
      <Stack.Screen name="Login" children={() => <Login props={props}/>} />
      <Stack.Screen name="Main" component={Main} options={{
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: 'white',
      }}/>
    </Stack.Navigator>
  );
}



const App = () => {  
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  AsyncStorage.getItem('sharedVideos').then((result) => {
    if(result === null){
      AsyncStorage.setItem('sharedVideos', JSON.stringify([]));
    }
  }).catch()


  return ( 
    <NavigationContainer> 
      <AppNavigator userName={userName} password={password} currentUser={currentUser}
        setCurrentUser={setCurrentUser} setPassword={setPassword}
        setUserName={setUserName} />      
    </NavigationContainer>
  );
};
export default App;
