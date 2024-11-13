import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
  } from 'react-native';
  import React from 'react';
  
  const {width, height} = Dimensions.get('screen');
  
  const SlideItem = ({item}) => {
    const translateYImage = new Animated.Value(40);
  
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.circle,
    }).start();
  
    return (
      <View style={styles.container}>
         <Text style={styles.name}>{item.name}</Text>
        <Animated.Image
          source={item.picture}
          resizeMode="contain"
          style={[
            styles.image,
            {/*
              transform: [
                {
                  translateY: translateYImage,
                },
              ],
            */},
          ]}
        />
  
        <View style={styles.content}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.other}>{item.other}</Text>
        </View>
      </View>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    container: {
      width,
      height,
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    image: {
      flex: 0.6,
      width: '90%',
      borderRadius:30,
      overflow: 'hidden',
      resizeMode:"cover",
      margin:30,
      borderWidth:2,
      borderColor:'#f5a623',
    },
    content: {
      flex: 0.4,
      alignItems: 'center',
      alignSelf: 'center',
      width: '90%',
      
    },
    name: {
      fontSize: 27,
      fontWeight: 'bold',
      color: '#333',
      backgroundColor:'#f5a623',
      alignContent: 'center',
      padding:10,
      paddingHorizontal:30,
      borderRadius:15,
      marginTop:'4.5%',
      elevation:15,
    },
    description: {
      fontSize: 18,
      marginVertical: 12,
      color: '#f5a623',
      fontWeight:'700',
    },
    other: {
      fontSize: 16.5,
      opacity: 0.75,
    },
  });