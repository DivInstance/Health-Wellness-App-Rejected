import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal,TextInput, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; 

const Record = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isGoalModalVisible, setGoalModalVisible] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  // Handler to change button state
  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
    setGoalModalVisible(false); // Close modal when selecting a new exercise
  };

  // Show input modal when pressing "Set Goal"
  const handleSetGoalPress = () => {
    if (selectedExercise) {
      setGoalModalVisible(true);
    } else {
      alert('Please select an exercise first');
    }
  };

  // Handle navigation based on selected exercise
  const handleNavigate = () => {
    if (selectedExercise === 'running') {
      navigation.navigate('run'); // Replace 'Run' with the actual route name for the running screen
    } else if (selectedExercise === 'cycling') {
      navigation.navigate('cycle'); // Replace 'Cycle' with the actual route name for the cycling screen
    } else {
      alert('Please select an exercise first');
    }
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

        {/* Set Goal Button */}
        <TouchableOpacity
          style={[
            styles.goalButton,
            selectedExercise && styles.selectedGoalButton,
          ]}
          onPress={handleSetGoalPress}
        >
          <Text
            style={[
              styles.goalText,
              selectedExercise && styles.selectedGoalText,
            ]}
          >
            Set Goal
          </Text>
        </TouchableOpacity>

        {/* "Let's Go" Button */}
        <TouchableOpacity
          style={styles.letsGoButton}
          onPress={handleNavigate}
        >
          <Text style={styles.letsGoText}>Let's Go</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>navigation.navigate("exercise")}
        >
          <Text style = {{color:'white',backgroundColor:'black',padding:10,borderRadius:15}}>Return to Activity Page</Text>
        </TouchableOpacity>

        {/* Goal Input Modal */}
        <Modal
          transparent={true}
          visible={isGoalModalVisible}
          animationType="slide"
          onRequestClose={() => setGoalModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Set Goal for {selectedExercise}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter goal (steps or km)"
                keyboardType="numeric"
                value={goalInput}
                onChangeText={setGoalInput}
              />
              <View style={styles.buttonGroup}>
                <Button
                  title="Save Goal"
                  color="green"
                  onPress={() => {
                    alert(`Goal for ${selectedExercise} set to ${goalInput}`);
                    setGoalModalVisible(false);
                    setGoalInput('');
                  }}
                />
                <View style={styles.buttonSpacing} />
                <Button
                  title="Cancel"
                  color="red"
                  onPress={() => setGoalModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

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
  goalButton: {
    backgroundColor: '#f5a623',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom:45,
  },
  selectedGoalButton: {
    backgroundColor: '#f5a623',
  },
  goalText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  selectedGoalText: {
    color: 'white',
  },
  letsGoButton: {
    backgroundColor: '#f5a623',
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginBottom : 45,
  },
  letsGoText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    width: '80%',
    padding: 10,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSpacing: {
    width: 45, // Adjust as needed for the gap size
  },
});

export default Record;