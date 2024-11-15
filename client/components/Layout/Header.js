import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute', // Position it absolutely
    top: 0, // Align at the top of the screen
    left: 0,
    right: 0,
    height: '13.5%', // Height of the header
    backgroundColor: 'white', // Background color for visibility
    shadowColor: '#000', // Adds shadow for iOS
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 2, width: 0 },
    zIndex: 1, // Ensures it's above all other elements
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 15, 
  },
  headerText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    alignSelf:'center',
  },
});

export default Header;
