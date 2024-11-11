import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Record = () => {

  const [selectedExercise, setSelectedExercise] = useState(null);

  // Handler to change button state
  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <ImageBackground
      source={require('../../assets/recordbg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Running and Cycling Buttons */}
        <View style={styles.buttonsContainer}>
          {/* Running Button */}
          <TouchableOpacity
            style={[
              styles.exerciseButton,
              selectedExercise === 'running' && styles.selectedButton,
            ]}
            onPress={() => handleSelectExercise('running')}
          >
            <MaterialCommunityIcons
              name="run"
              size={50}
              color={selectedExercise === 'running' ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.exerciseText,
                selectedExercise === 'running' && styles.selectedText,
              ]}
            >
              Running
            </Text>
          </TouchableOpacity>

          {/* Cycling Button */}
          <TouchableOpacity
            style={[
              styles.exerciseButton,
              selectedExercise === 'cycling' && styles.selectedButton,
            ]}
            onPress={() => handleSelectExercise('cycling')}
          >
            <FontAwesome
              name="bicycle"
              size={50}
              color={selectedExercise === 'cycling' ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.exerciseText,
                selectedExercise === 'cycling' && styles.selectedText,
              ]}
            >
              Cycling
            </Text>
          </TouchableOpacity>
        </View>

        {/* Set Goal Buttons */}
        <View style={styles.goalContainer}>
          {/* Set Goal for Running */}
          <TouchableOpacity
            style={[
              styles.goalButton,
              selectedExercise === 'running' && styles.selectedGoalButton,
            ]}
            onPress={() => alert('Set goal for Running')}
          >
            <Text
              style={[
                styles.goalText,
                selectedExercise === 'running' && styles.selectedGoalText,
              ]}
            >
              Set Goal
            </Text>
          </TouchableOpacity>

          {/* Set Goal for Cycling */}
          <TouchableOpacity
            style={[
              styles.goalButton,
              selectedExercise === 'cycling' && styles.selectedGoalButton,
            ]}
            onPress={() => alert('Set goal for Cycling')}
          >
            <Text
              style={[
                styles.goalText,
                selectedExercise === 'cycling' && styles.selectedGoalText,
              ]}
            >
              Set Goal
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 60,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  exerciseButton: {
    backgroundColor: '#d3d3d3',
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#f5a623',
  },
  exerciseText: {
    marginTop: 10,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  selectedText: {
    color: 'white',
  },
  goalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  goalButton: {
    borderColor: '#f5a623',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  selectedGoalButton: {
    backgroundColor: '#f5a623',
  },
  goalText: {
    fontSize: 18,
    color: '#f5a623',
    fontWeight: 'bold',
  },
  selectedGoalText: {
    color: 'white',
  },
});

export default Record;