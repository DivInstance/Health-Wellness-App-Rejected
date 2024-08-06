import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { beginAsyncEvent } from 'react-native/Libraries/Performance/Systrace'

const Layout = ({children}) => {
  return (
    <>
    
    <View>
        {children}
    </View>

    <View style = {styles.footer}>
    <Footer/>
    </View>

    </>

  )
}

export default Layout

const styles = StyleSheet.create({
  footer : {
    display : 'flex',
    flex: 1,
    //Added height
    height:"7.5%",
    width: '99%',
    borderColor: 'lightgray',
    justifyContent: 'flex-end',
    zIndex: 100,
    borderTopWidth: 1.5,
    position: 'absolute',
    //bottom: 9,
    bottom:0,
    padding: 10,
    backgroundColor: 'white',
    borderRadius:10,
  },
});
