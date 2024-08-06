import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => { 
        console.log(searchText);
        setSearchText('');
    };

  return (
    <View style = {{height:90, marginTop:30, backgroundColor:'lightgray'}}>        
        <View style = {styles.container}>
         <TextInput style = {
            styles.inputBox} 
            value={searchText} 
            onChangeText={
                (text)=> setSearchText()}
        />
         <TouchableOpacity style = {styles.searchBtn} onPress={handleSearch}>
        <Icon name="search" style = {styles.icon}/>   
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex : 1,
        flexDirection: 'roe',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    inputBox: {
        borderWidth: 0.3,
        top:20,
        width: "100%",
        position : 'absolute',
        left : 15,
        height : 40,
        color: 'white',
        backgroundColor: "#ffffff",
        paddingLeft: 10,
        fontsize: 5,
        borderRadius: 5,
    },
    searchBtn: {
        position: 'absolute',
        left : "93%",
        top : 33,
    }  
})

export default Header