import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Layout/Header';
import MaterialCommunityIcons from  'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Home = () => {

  return (
    <Layout>

    <ScrollView style = {{backgroundColor:'white'}}>
      
      <TouchableOpacity style = {[styles.fragmentA,{marginTop:27}]}>
        <View style = {{flexDirection:'row'}}>
        <MaterialCommunityIcons name ='hand-heart-outline' style = {[styles.containerHeadIcon,{backgroundColor:'#C80036'}]}/>        
        <Text style = {styles.containerHeadText}>  Digital Wellbeing</Text>
        <Entypo name = 'dots-three-vertical' style = {[styles.containerHeadIcon,{backgroundColor:'#666666',left:171}]}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.fragmentB}>
        <View style = {{flexDirection:'row'}}>  
          <MaterialCommunityIcons name ='cup-water' style = {[styles.containerHeadIcon,{backgroundColor:'#4285f4'}]}/>        
          <Text style = {styles.containerHeadText}>  Drink Water</Text>
          <Entypo name = 'dots-three-vertical' style = {[styles.containerHeadIcon,{backgroundColor:'#666666',left:201}]}/>
        </View>

        <View style = {{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>        
        <TouchableOpacity style = {styles.waterDrop}><MaterialIcons name='water-drop' style={{color:'#2389da',fontSize:18}}/><Text>150ml</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.waterDrop}><MaterialIcons name='water-drop' style={{color:'#2389da',fontSize:18}}/><Text>300ml</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.waterDrop}><MaterialIcons name='water-drop' style={{color:'#2389da',fontSize:18}}/><Text>450ml</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.waterDrop}><MaterialIcons name='water-drop' style={{color:'#2389da',fontSize:18}}/><Text>600ml</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.waterDrop}><MaterialIcons name='water-drop' style={{color:'#2389da',fontSize:18}}/><Text>750ml</Text></TouchableOpacity>
        </View>

      </TouchableOpacity>


      

      <View style = {styles.fragmentA}>
        <View style = {{flexDirection:'row'}}>
        <FontAwesome6 name ='dumbbell' style = {[styles.containerHeadIcon,{backgroundColor:'#fe7951'}]}/>     
        <Text style = {styles.containerHeadText}>  Excercise</Text>
        <Entypo name = 'dots-three-vertical' style = {[styles.containerHeadIcon,{backgroundColor:'#666666',left:207}]}/>  
        </View>
      </View>

      <View style = {styles.fragmentC}>
        <View style = {{flexDirection:'row'}}>    
        <MaterialCommunityIcons name ='hand-heart-outline' style = {styles.containerHeadIcon}/>        
        <Text style = {styles.containerHeadText}>  Digital Wellbeing</Text>
        <Entypo name = 'dots-three-vertical' style = {[styles.containerHeadIcon,{backgroundColor:'#666666',left:170}]}/>
        </View>
      </View>
      
    </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#007AFF',
    borderRadius:15,
    marginTop:45,
    height: 45,
    width:"93%",
    left:12,
  },
  fragmentA : {
    //backgroundColor: '#383838',
    backgroundColor:'#777777',
    height: 300,
    width: '93%',
    marginTop:15, 
    marginLeft:13.5,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowOpacity: 0.8,
    shadowColor:'#C80036',
    shadowRadius: 2,
    elevation: 18,
  },
  fragmentB : {
    backgroundColor: '#777777',
    height: 210,
    width: '93%',
    marginLeft:13.5,
    padding: 20,
    margin: 10,
    marginTop:15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#4285f4',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 18,
  },
  fragmentC : {
    backgroundColor: '#777777',
    height: 150,
    width: '93%',
    marginLeft:13.5,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    marginTop:15,
    marginBottom: 10,
    shadowColor:'#fe7951',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 18,
    marginBottom: 90,
  },
  containerHeadText : {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    marginTop: 4,
    
  },
  containerHeadIcon : {
    fontSize: 15,
    padding: 5,
    borderRadius: 50,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',

  },
  waterDrop : {
    fontSize: 30,
    resizeMode: 'content',
    padding: 10,
    margin:9,
    borderRadius: 50,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor:'white',
    elevation: 6,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 27,
  },
  
});

export default Home