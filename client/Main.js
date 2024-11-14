import {ActivityIndicator} from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home/Home.js";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Loading from "./screens/Home/Loading.js";
import Account from "./screens/Account/Account";
import EditProfile from "./screens/Account/EditProfile";
import Notifications from "./screens/Account/Notifications";
import Developer from "./screens/Account/Developer";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Emergency from "./screens/Account/Emergency.js";
import Exercise from "./screens/Activity/Excercise.js";
import Record from "./screens/Record/Record.js";
import Cycle from "./screens/Record/Cycle.js";
import Run from "./screens/Record/Run.js";
import ScreenTime from "./screens/Home/Screentime.js";
import AnimatedBackground from "./screens/Learn/Animatedbg.js";
import Meditation from "./screens/Learn/Medtitate.js";

//routes for navigation
const Stack = createNativeStackNavigator();

export default function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  //getuser
  useEffect(() => {
    const getUserLocalData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@userData'); // Check for user data
        const token = await AsyncStorage.getItem('@authToken');   // Check for token

        if (userData && token) {
          setIsAuthenticated(true); // User is logged in
        } else {
          setIsAuthenticated(false); // User is not logged in
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsAuthenticated(false); // Default to not logged in on error
      }
    };
    getUserLocalData();
  }, []);

  if (isAuthenticated === null) {
    // Optionally, you can show a loading indicator while checking
    return <ActivityIndicator size="large" color="#0000ff" />; // Replace with your loading component
  }

  return (
    <>
      <NavigationContainer>
      <Stack.Navigator initialRouteName = {"login"}>
        {/*<Stack.Navigator initialRouteName = {isAuthenticated ? "Home Page":"Login"}>*/}
          
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="loading" component={Loading} options={{ headerShown: false }} />
          <Stack.Screen name="Home Page" component={Home} options= {{headerShown: false, title: 'HEALTH STATS', headerTitleAlign: 'center', fontSize: 36, headerTitleStyle: { fontWeight: 'bold', fontSize: 36, color: 'grey', opacity: 0.8, letterSpacing:3, },}}/>
          <Stack.Screen name="Account Information" component={Account} />
          <Stack.Screen name="notifications" component={Notifications} options={{ headerShown: false }}/>
          <Stack.Screen name="profile" component={EditProfile} options={{headerShown:true, title:"Profile Edit Section"}}/>
          <Stack.Screen name="developer" component={Developer} options = {{ headerShown: true, title : 'Developers', headerTitleAlign:'center',headerTitleStyle: { fontWeight: '500', fontSize: 24 }}}/>
          <Stack.Screen name="emergency" component={Emergency} options={{ headerShown: false }}/>
          <Stack.Screen name="exercise" component={Exercise} options={{ headerShown: true, title: 'Exercise Activity', headerTitleAlign: 'center' }}/>
          <Stack.Screen name="record" component={Record} options={{ headerShown: false }}/>
          <Stack.Screen name="cycle" component={Cycle} options={{ headerShown: false }}/>
          <Stack.Screen name="run" component={Run} options={{ headerShown: false }}/>
          <Stack.Screen name="screentime" component={ScreenTime} options={{ headerShown: true, title : 'Screen Time', headerTitleAlign:'center',headerTitleStyle: { fontWeight: 'bold', fontSize: 30 }}}/>
          <Stack.Screen name="meditbg" component={AnimatedBackground} options={{ headerShown: false }}/>
          <Stack.Screen name="meditate" component={Meditation} options={{ headerShown: false }}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


        {/*
          {!isAuthenticated && ( 
            <>
            <Stack.Screen name = 'login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name = 'register' component={Register} options={{headerShown: false}}/>
            </>
          )}*/}
