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
        <AntDesign style = {[styles.icons, route.name === "home" && styles.active]} name = "home"/>
        <Text style = {[StyleSheet.iconText, route.name === "home" && styles.active]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.menuContainer} onPress={()=> alert("Activity Page")}>
        <AntDesign style = {[styles.icons, route.name === "activity" && styles.active]} name = "linechart"/>
        <Text style = {[StyleSheet.iconText, route.name === "activity" && styles.active]}>Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.menuContainer} onPress={()=> alert("Rec")}>
        <AntDesign style = {[styles.icons, route.name === "rec" && styles.active]} name = "pluscircleo"/>
        <Text style = {[StyleSheet.iconText, route.name === "rec" && styles.active]}>EaseIt</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.menuContainer} onPress={()=> alert("Learn Page")}>
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