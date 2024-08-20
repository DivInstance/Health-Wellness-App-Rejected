import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import call from 'react-native-phone-call'

const Emergency = () => {
    const [inputValue, setInputValue] = useState('9729326759')
  
    const triggerCall = () => {
        const args = {
            number: inputValue,
            prompt: true,
        };
  
        //make a call
        call(args).catch(console.error);
    };
  

  return (
    <View style={styles.container}>
    <View style = {styles.headContainer}>
        <Text style = {{fontSize:21,color:'white'}}>For the moments you can’t afford to lose.</Text>
    </View>

    <TouchableOpacity style={{flexDirection:'row'}} onPress={triggerCall}>
    <Text style = {{fontSize:27,color:'red',fontWeight:'500', marginLeft:6,transform:[{translateY:-150}]}}>Ambulance Helpline</Text>
    {/*<Ionicons name='call-sharp' size={19.5} color='red' style={{transform:[{translateY:-132}],marginLeft:10}}/>/
    <Fontisto name='ambulance' size={21} color='red' style={{transform:[{translateY:-144}],marginLeft:10}}/> */}
    
    </TouchableOpacity>    

    <View style={styles.circleContainer}>
    <Text style = {{fontSize:30,color:'#333333',fontWeight:'500' ,transform: [{ translateY: -102 }]}}>Are you in emergency?</Text>
    <Text style = {styles.flareText}>Tap the button to deploy emergency flare, help will reach you soon</Text>
      
      <TouchableOpacity style={[styles.innerCircle]} onPress={triggerCall}>
        <View style={[styles.middleCircle]}>
            <View style={[styles.outerCircle]}>
              <View style = {{position:'absolute'}}>
              </View>
            </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.SOS}>SOS</Text>
    </View>


      <View style = {styles.emergencyInfo}>
        <Text style = {styles.infoTitle}>
            Emergency Guardian Contacts
        </Text>

        <Text style = {styles.infoText}> Abrakadabra @ 1234567890 </Text>
        <Text style = {styles.infoText}> Mom @ 1010101010 # Verified </Text>
        <Text style = {styles.infoText}> Dad @ 0101010101 # Verified</Text>

        {/*<Text style={styles.infoText}>My Safe Person Contact: 908679087</Text> 
        <Text style={styles.infoText}>Latitude: 37.7749° N    Longitude: 122.4194° W</Text>
        <Text style={styles.infoText}>Blood Type: O+  Medicines: Levocetrizine</Text>
        <Text style={styles.infoText}>Allergies: Penicillin  Conditions: Asthma</Text>*/}
      </View>

    </View>

  )
}

export default Emergency

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headContainer: {
      top:-180,
      height: '5.7%',
      backgroundColor: '#333',
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    flareText:{
      fontSize:21,
      color:'grey',
      transform: [{ translateY: -81 },], 
      alignContent:'center',
      lineHeight:36,
      textAlign:'center'
    },
    circleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',  // Position circles and SOS correctly
      width: 300,
      height: 300,  // Same size as outer circle
      transform: [{ translateY: -15 },]
      },
    outerCircle: {
        width: 270,
        height: 270,
        borderRadius: 300,
        backgroundColor: '#ed4944',
        resizeMode: 'content',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        opacity:0.42,
        elevation: 0,
    },
    middleCircle: {
        width: 210,
        height: 210,
        borderRadius: 200,
        backgroundColor: '#ed4944',
        resizeMode: 'content',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        opacity:0.63
    },

    innerCircle: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#ff0000',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SOS: {
        fontSize: 63,
        color: 'white',
        fontWeight: 'bold',
        justifyContent:'center', 
        //top: '-39%',  // Center vertically
        //left: '24%', // Center horizontally
        transform: [{ translateX: 0 }, { translateY: -111 }], 
    },
    emergencyInfo: {
      backgroundColor: '#F5FCFF',
      position: 'absolute',
      height:"21%",
      width:"87%",
      padding: 10,
      borderRadius: 10,
      shadowColor: '#ff0000',
      shadowOpacity: 0.75,
      elevation: 9,
      marginBottom: 10,
      bottom:"3%",

    },
    infoTitle:{
      fontSize:24,
      color: '#111111',
      fontWeight:'500',
      lineHeight:24,
      padding: 15,
      textAlign: 'center',
    },
    infoText: {
      fontSize: 19.5,
      color: '#333333',
      fontWeight:'400',
      lineHeight:24,
      padding: 4.5,
      textAlign: 'center',
    }
})

