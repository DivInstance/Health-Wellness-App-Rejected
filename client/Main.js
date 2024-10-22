import {ActivityIndicator} from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Loading from "./screens/Loading";
import Account from "./screens/Account/Account";
import EditProfile from "./screens/Account/EditProfile";
import Notifications from "./screens/Account/Notifications";
import Developer from "./screens/Account/Developer";
import Test from "./screens/featureTest.js";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Emergency from "./screens/Account/Emergency.js";

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
    return <ActivityIndicator size="large" color="#0000ff" />;; // Replace with your loading component
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName = {isAuthenticated ? "Home Page":"Login"}>
          {/*<Stack.Screen name = 'login' component={Login} options={{headerShown: false}}/> */}
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{ headerShown: false }}
          />

          {/*
          {!isAuthenticated && ( 
            <>
            <Stack.Screen name = 'login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name = 'register' component={Register} options={{headerShown: false}}/>
            </>
          )}*/}

          <Stack.Screen
            name="loading"
            component={Loading}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home Page" component={Home} />
          <Stack.Screen name="Account Information" component={Account} />
          <Stack.Screen
            name="notifications"
            component={Notifications}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="profile" component={EditProfile} />
          <Stack.Screen name="developer" component={Developer} />
          <Stack.Screen
            name="emergency"
            component={Emergency}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="test" component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
