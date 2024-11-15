import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const InputBox = ( { autoComplete, placeholder, secureTextEntry, value, setValue, text } ) => {
  return (
    <View style = {styles.container}>
      <TextInput style = {styles.input} 
      autoComplete={autoComplete} 
      placeholder={placeholder}
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      value={value}
      setValue={setValue}
      onChangeText={(text)=>setValue(text)}
      />
    </View>
  )}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alightItems: true,
        marginVertical: 10,
    },
    input: {
        width: '75%',
        height: 36,
        backgroundColor: 'white',
        marginLeft: 45,
        paddingLeft: 10,
        borderRadius: 10,
        color: '#000000',
        borderWidth: 1.5,
        borderColor: 'gray',
        

    },

})

export default InputBox