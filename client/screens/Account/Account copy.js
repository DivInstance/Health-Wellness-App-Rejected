import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Linking } from 'react-native'
import React from 'react'
import Layout from '../../components/Layout/Layout'
import { userData } from '../../data/userData'
import AntDesign from 'react-native-vector-icons/AntDesign.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'

const Account = () => {
  return (
    <Layout>
      <View style = {styles.container}>
        <View style = {styles.ProfileContainer}>
        <Image style = {styles.profilePicture} source = {{uri:userData.profilePicture}}/>  

            <Text style = {{color:"#7768cc", fontSize:32, fontWeight:"bold", textTransform: 'uppercase',alignSelf:'center'}}> 
              {userData.name} 
            </Text>       
        
        <View style = {styles.userDetails}>
        <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Fontisto name='blood-drop' style = {{color:'red'}}/>
            <Text style={{fontWeight:'300',fontSize:18, padding:1.5}}>  {userData.bloodGroup}</Text>
        </View>

        <Text style = {{fontWeight:'400',fontSize:18, padding:1.5}}>email : <Text style={{fontWeight:'300'}}>{userData.email}</Text></Text>
        <Text style = {{fontWeight:'400', fontSize:18, padding:1.5}}>contact: <Text style={{fontWeight:'300'}}>{userData.contactNo}</Text></Text> 
        <Text style = {{fontWeight:'400', fontSize:18, padding:1.5}}> height :<Text style={{fontWeight:'300'}}> {userData.height}  
        <Text style = {{fontWeight:'400'}}>  weight : <Text style={{fontWeight:'300'}}></Text><Text style={{fontWeight:'300'}}>{userData.weight}   
        <Text style = {{fontWeight:'400'}}>  gender: <Text style={{fontWeight:'300'}}>{userData.gender}</Text></Text></Text></Text></Text></Text>
      
        </View>
        </View>


          <View style = {styles.accountContainer}>
            <Text style = {styles.heading}> Account Setting </Text>
          
            <View style = {{marginTop:15, }}>
              <TouchableOpacity style = {styles.button}>              
                  <AntDesign name='edit' style = {styles.button}/> 
                  <Text style = {styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.button}>              
                  <MaterialIcons name='notifications-none' style = {styles.button}/> 
                  <Text style = {styles.buttonText}>Notifications</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.button}>              
                  <AntDesign name='download' style = {styles.button}/> 
                  <Text style = {styles.buttonText}>Download my Data</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.button}>              
                  <AntDesign name='filetext1' style = {styles.button}/> 
                  <Text style = {styles.buttonText} onPress={()=>Linking.openURL('https://docs.google.com/document/d/1JW7rxpxPqdMvcX_WCz0x0vPieGznUUKjH3_jst1Uf84/edit#heading=h.p1miavl8ze90')}>Documentation</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.button}>              
                  <AntDesign name='download' style = {styles.button}/> 
                  <Text style = {styles.buttonText} onPress={()=>Linking.openURL('https://github.com/DivInstance/Health-Wellness-App')}>Application Repository</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.button}>              
                  <FontAwesome name='connectdevelop' style = {styles.button}/> 
                  <Text style = {styles.buttonText}>Developer Contact</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.logoutButton}>              
                  <AntDesign name='logout' style = {{flexDirection: "row", padding: 7.5, fontSize: 15, color:'white',}}/> 
                  <Text style = {styles.logoutText}>Logout</Text>
              </TouchableOpacity>              
            </View>

          </View>
        </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical:20,
  },
  profilePicture: {
    height :120,
    width : "100%",
    resizeMode: "contain",
  },
  nameText : {
    marginTop : 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",   
  },
  userDetails: {
    marginTop : 10,
    marginBottom: 10,
    justifyConten:"center",
    alignItems:"center",
    fontSize: 50,

  },
  ProfileContainer : {
    backgroundColor: "transparent",
  },
  accountContainer: {
    padding: 10,
    backgroundColor: "white",
    marginTop: 10,
    marginVertical: 10,
    elevation: 5,
    borderRadius: 10,
    paddingBottom: 0,
  },
  heading : {
    fontSize: 21,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  button: {
    flexDirection: "row",
    padding: 6,
    fontSize: 18,
  },
  buttonText: {
    fontSize:18,
    marginRight: 15,
    padding:4.5,
  },
  logoutButton : {
    marginLeft: 240,
    width: "30%",
    backgroundColor: "red",
    flexDirection: "row",
    borderRadius: 10,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  logoutText: {
    color: "white",
    fontSize: 18,
  },
});

export default Account