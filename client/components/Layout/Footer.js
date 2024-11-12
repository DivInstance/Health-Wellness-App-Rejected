import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign.js'
import { useRoute, useNavigation } from '@react-navigation/native'

const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
     <View style = {styles.container}>
      <TouchableOpacity style = {styles.menuContainer} onPress={()=> navigation.navigate('Home Page')}>
        <AntDesign style = {[styles.icons, route.name === "Home Page" && styles.active]} name = "home"/>
        <Text style = {[StyleSheet.iconText, route.name === "Home Page" && styles.active]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.menuContainer} onPress={()=> navigation.navigate('exercise')}>
        <AntDesign style = {[styles.icons, route.name === "exercise" && styles.active]} name = "linechart"/>
        <Text style = {[StyleSheet.iconText, route.name === "exercise" && styles.active]}>Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.menuContainer} onPress={()=>  navigation.navigate('record')}>
        <AntDesign style = {[styles.icons, route.name === "record" && styles.active]} name = "pluscircleo"/>
        <Text style = {[StyleSheet.iconText, route.name === "record" && styles.active]}>Record</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.menuContainer} onPress={()=> navigation.navigate('learn')}>
        <AntDesign style = {[styles.icons, route.name === "learn" && styles.active]} name = "earth"/>
        <Text style = {[StyleSheet.iconText, route.name === "learn" && styles.active]}>Learn</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.menuContainer} onPress={()=> navigation.navigate('Account Information')}>
        <AntDesign style = {[styles.icons, route.name === "Account Information" && styles.active]} name = "user"/>
        <Text style = {[StyleSheet.iconText, route.name === "Account Information" && styles.active]}>Account</Text>
      </TouchableOpacity>
     

    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  container : {
    flexDirection: "row",  // If we make it column, it will align other icons vertically
    justifyContent: "space-between",
    paddingHorizontal: 10,
    bottom: -3,
    height: "120%",
    /*backgroundColor: "white",*/

  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center", 
  },
  icons :{
    fontSize: 25,
    color: "#000000",
  },
  iconText :{
    fontColor:  "#000000",
    fontSize: 10,
  },
  active :{
    color: 'blue',
  },
});