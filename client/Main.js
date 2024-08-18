import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Loading from './screens/Loading';
import Account from './screens/Account/Account';
import EditProfile from './screens/Account/EditProfile';
import Notifications from './screens/Account/Notifications';
import Developer from './screens/Account/Developer';
import Test from './screens/featureTest.js';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Emergency from './screens/Account/Emergency.js';




//routes for navigation
const Stack = createNativeStackNavigator()

export default function Main () {

    const [isAuthenticated,setIsAuthenticated] = useState(null)

     //getuser
     useEffect(()=>{
        const getUserLocalData = async () => { 
            let data = await AsyncStorage.getItem('@auth');
            //let loginData = JSON.parse(data);
            console.log(`User Login Data - ${data}`)   
    };
    getUserLocalData()},[])
  
return (     

      <NavigationContainer>
          <Stack.Navigator initialRouteName='emergency'>
          
          {!isAuthenticated && ( 
            <>
            <Stack.Screen name = 'login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name = 'register' component={Register} options={{headerShown: false}}/>
            </>
          )}
            

            <Stack.Screen name = 'loading' component={Loading} options={{headerShown: false}}/>
            <Stack.Screen name = 'Home Page' component = {Home}/>
            <Stack.Screen name = 'Account Information' component={Account} /> 
            <Stack.Screen name = 'notifications' component = {Notifications} options={{ headerShown: false,}}/>
            <Stack.Screen name = 'profile' component = {EditProfile}/>
            <Stack.Screen name = 'developer' component = {Developer}/>
            <Stack.Screen name = 'emergency' component = {Emergency} options={{headerShown:false,}}/>
            <Stack.Screen name = 'test' component = {Test}/>
                     
    
          </Stack.Navigator>
      </NavigationContainer>
  );
}



