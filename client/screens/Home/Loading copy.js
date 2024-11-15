import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


export default function Doggu({navigation}) {    

            // Navigate to the login page when the user taps the 'HealthEase' text.
    //const Doggu =  () => {navigation.navigate('login')}

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('login');
        }, 2700);

        return () => clearTimeout(timer);
    }, [navigation]);
  
    // Navigate to the login page when the user taps the 'HealthEase' text.
    const Doggu = () => {
      navigation.navigate('login');
    };

  return (
    <View style ={styles.container}>

        <TouchableOpacity onPress={Doggu}>
            <Text style = {styles.heading}> HealthEase </Text> 
        </TouchableOpacity>       
        

    <View style={styles.Doggu}>
        <TouchableOpacity onPress={Doggu}>
            <Image source = {require('../assets//doggu.gif')}/>
            <StatusBar style="auto" />
        </TouchableOpacity>      
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  Doggu: {
    flex: 1,
    marginTop: 270,
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container : {
    backgroundColor: '#e3e3e3',
  },
  heading : {
    fontSize: 72,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 90,
    color: '#534057',
  }
  
});
