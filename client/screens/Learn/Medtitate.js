// Meditate.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {Easing, useSharedValue, useAnimatedStyle, withDelay,withRepeat, withTiming,} from 'react-native-reanimated';
import { meditations } from './Medata'; // Assuming this is where the meditation data is stored
import Header from '../../components/Layout/Header';
import {useNavigation } from '@react-navigation/native'

// Animated Background Component
function AnimatedBackground() {
  const {height, width} = useWindowDimensions();

  const top1 = useSharedValue(0.15 * height);
  const top2 = useSharedValue(0.45 * height);
  const top3 = useSharedValue(0.75 * height);

  useEffect(() => {
    const options = {
      duration: 1800, 
      easing: Easing.bezier(0.5, 0, 0.5, 1),
    };
    top1.value = withRepeat(withTiming(0.2 * height, options), -1, true);
    top2.value = withDelay(
      1000,
      withRepeat(withTiming(0.4 * height, options), -1, true)
    );
    top3.value = withDelay(
      2000,
      withRepeat(withTiming(0.6 * height, options), -1, true)
    );
  }, [height, top1, top2, top3]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    top: top1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    top: top2.value,
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    top: top3.value,
  }));

  return (
    <View style={styles.container}>
      {/* Circles */}
      <Animated.View style={[styles.circle, styles.circleYellow400, animatedStyle1]} />
      <Animated.View style={[styles.circle, styles.circleYellow300, animatedStyle2]} />
      <Animated.View style={[styles.circle, styles.circleOrange500, animatedStyle3]} />
    </View>
  );
}

// Timer Functionality
const Timer = ({ duration, onComplete, onPause }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration * 60); // Convert minutes to seconds
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    if (secondsLeft === 0) {
      onComplete();
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, onComplete]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => {
          setIsRunning(!isRunning);
          if (!isRunning) onPause(); // Return to the list when paused
        }}
      >
        <Text style={styles.startButtonText}>{isRunning ? 'Pause' : 'Terminate'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Meditate() {
  
  const navigation = useNavigation();

  const [currentMeditation, setCurrentMeditation] = useState(null);
  const [isMeditating, setIsMeditating] = useState(false);

  const handleStartMeditation = (item) => {
    setCurrentMeditation(item);
    setIsMeditating(true);
  };

  const handleCompleteMeditation = () => {
    setIsMeditating(false);
    alert('Meditation Complete');
  };

  const handlePauseMeditation = () => {
    setIsMeditating(false); // Return to the meditation list
  };

  

  const renderItem = ({ item }) => (
    <View style={styles.meditationCard}>
      <Text style={styles.meditationTitle}>{item.title}</Text>
      <Text style={styles.meditationDuration}>{item.duration} mins</Text>
      {!isMeditating && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => handleStartMeditation(item)}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.pageContainer}>
      <Header title="Meditation and Mindfullness" />
      <AnimatedBackground />
      <View style={styles.overlay}>
        {!isMeditating ? (
          <FlatList
            data={meditations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Timer
            duration={currentMeditation.duration}
            onComplete={handleCompleteMeditation}
            onPause={handlePauseMeditation}
          />
        )}
        
        <TouchableOpacity style = {styles.terminateContainer} onPress={()=>navigation.navigate("Home Page")}>
          <Text style={styles.terminateText}>Terminate Session</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    //alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: '42%',
    width: '90%',
    alignSelf: 'center',
    top: '6%',
    paddingBottom:'15%'
  },
  meditationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
    width: '100%',
  },
  meditationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  meditationDuration: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 15,
    alignSelf: 'center',
  },
  startButton: {
    backgroundColor: '#f97316',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'center',
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16.5,
    
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    width: '80%',    
    alignContent: 'center',
    alignSelf: 'center',
    top: '45%',
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',    
  },
  terminateContainer: {
    borderRadius: 15,
    height:'6%',
    width: '79.5%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    bottom:'7.5%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  terminateText: {
    borderRadius: 12,
    height:'84%',
    width: '97%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor:'#f97316',
    textAlign:'center',
    textAlignVertical:'center',
    fontSize:18,
    color: 'white',
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute',
    width: '400%',
    aspectRatio: 1,
    borderRadius: 9999,
    
  },
  circleYellow400: {
    backgroundColor: '#facc15',
  },
  circleYellow300: {
    backgroundColor: '#fde047',
  },
  circleOrange500: {
    backgroundColor: '#f97316',
  },
});
