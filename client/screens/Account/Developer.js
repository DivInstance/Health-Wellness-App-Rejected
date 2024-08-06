import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import {devData} from '../../data/devData'
import { userData } from '../../data/userData'

const Developer = () => {
  return (
    <View style = {styles.container}>
      <Text>Developer</Text>
        <Image source={{uri:devData.image}} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: 'cover',
    }
})


export default Developer