import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'

const screenWidth = Dimensions.get('window').width;

const Cycle = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [showBlackScreen, setShowBlackScreen] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setCountdown(3);
    setShowBlackScreen(true);
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(countdownInterval);
          setCountdown(null);
          setIsRunning(true);
          setShowBlackScreen(false);
          return null;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
    setShowBlackScreen(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.Record}>
      {showBlackScreen ? (
        <View style={styles.blackScreen}>
          {countdown !== null && <Text style={styles.countdown}>{countdown}</Text>}
          {!isRunning && countdown === null && (
            <TouchableOpacity onPress={handleStart} style={styles.buttonStart}>
              <Text style={styles.buttonText}>START</Text>
            </TouchableOpacity>
          )}

          {!isRunning && countdown === null && (
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=> navigation.navigate('exercise')}>
              <Text style={{color:'white', marginTop:'9%',fontSize:18}}>Terminate the session</Text>
            </TouchableOpacity>
          )}

          
        </View>
      ) : (
        <>
          {!isPaused && (
            <Image style={styles.Cycle} source={require('../../assets/cycle.gif')} />
          )}
          <View style={styles.overlay}>
            <Text style={styles.stopwatch}>{formatTime(time)}</Text>

            {isRunning && (
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={handlePauseResume} style={[styles.buttonEnd]}>
                  <Text style={styles.buttonText}>{isPaused ? 'RESUME' : 'PAUSE'}</Text>
                </TouchableOpacity>

                {isPaused && (
                  <TouchableOpacity onPress={handleStop} 
                  style={{backgroundColor: '#f5a623',
                    padding: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginTop: 20,
                    width: '75%',
                  }}>
                    
                    <Text style={styles.buttonText}>FINISH SESSION</Text>
                  </TouchableOpacity>
                )}

              </View>
            )}
            {!isRunning && time > 0 && (
              <TouchableOpacity onPress={handleStart} style={styles.buttonStart}>
                <Text style={styles.buttonText}>START</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Record: {
    backgroundColor: 'black',
    height: '100%',
  },
  blackScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  countdown: {
    color: 'white',
    fontSize: 48,
    marginBottom: 20,
  },
  Cycle: {
    width: screenWidth,
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    top: '15%',
    alignItems: 'center',
  },
  stopwatch: {
    color: 'white',
    fontSize: 72,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: '90%',
  },
  buttonStart: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    backgroundColor: '#4CAF50',
    borderRadius: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonEnd: {
    width: screenWidth * 0.36,
    height: screenWidth * 0.36,
    backgroundColor: '#4CAF50',
    borderRadius: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 3,
  },
});

export default Cycle;
