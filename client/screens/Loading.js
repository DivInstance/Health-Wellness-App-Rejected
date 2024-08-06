import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';


export default function Doggu({navigation}) {    

  // Navigate to the login page when the user taps the 'HealthEase' text.
//const Doggu =  () => {navigation.navigate('login')}

useEffect(() => {
const timer = setTimeout(() => {
navigation.navigate('login');
}, 4500);

return () => clearTimeout(timer);
}, [navigation]);

// Navigate to the login page when the user taps the 'HealthEase' text.
const Doggu = () => {
navigation.navigate('login');
};

  
  return (
    <View style ={styles.container}>

        <TouchableOpacity onPress={Doggu}>
        <Animated.View
          key={'uniqueKey'}
          entering={FadeIn.duration(4500)}>

            <Text style = {styles.heading}> HealthEase </Text> 
          </Animated.View>
        </TouchableOpacity>       
        

    <View style={styles.Doggu}>
        <TouchableOpacity onPress={Doggu} style = {{backgroundColor:'black'}}>
            <Image source = {require('../assets//dogggu.gif')} />
            <StatusBar style="auto" />
        </TouchableOpacity>      
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  Doggu: {
    marginTop: 270,
    backgroundColor: 'black',
    height: 100,

  },
  container : {
    backgroundColor: 'black',
  },
  heading : {
    animation: 'fade-in 2s',
    fontSize: 72,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 90,
    color: 'white',
  }
  
});
