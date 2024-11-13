import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ProgressBarAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

{/*Ignore all the warnings and irrelevant logs and pop ups*/}
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs()

export default function ScreenTime({ navigation }) {
  const [screenTime, setScreenTime] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Update screen time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setScreenTime((prevTime) => prevTime + 1);
      setHours(Math.floor(screenTime / 3600));
      setMinutes(Math.floor((screenTime % 3600) / 60));
      setSeconds(screenTime % 60);
    }, 1000);

    return () => clearInterval(timer);
  }, [screenTime]);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [2, 4, 3, 7, 5, 6, 8] }],
  };

  const screenWidth = Dimensions.get('window').width;

  const divprint = "            ";
  const kprint = "                           ";

  return (
    <ScrollView style={styles.container}>
      {/* Title and Settings Icon 
      <View style={styles.header}>
        <Text style={styles.title}>Screen Time</Text>
        <Ionicons
          name="settings"
          size={28}
          color="#666666"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>*/}

      {/* Screen Time Counter */}
      <View style={styles.timeContainer}>
        <Text style={styles.limitText}>Limit: 7 hr 30 mins</Text>
        <Text style={styles.timeText}>
          {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </Text>
        <Text style={styles.subText}>Today's screen time</Text>
        <ProgressBarAndroid styleAttr="Horizontal" color="#f5a623" indeterminate={false} progress={0.1} style ={{width:'30%'}} />
        <Text style={styles.progressText}>Screen Time</Text>
      </View>
        
      {/* Pickups and Average Use Tiles */}
      <View style={styles.tileRow}>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Pickups</Text>
          <Text style={styles.tileValue}>20</Text>
          <Text style={styles.tileSubText}>times</Text>
          <MaterialCommunityIcons name="cellphone" size={40} color="#f5a623" />
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Average Use</Text>
          <Text style={styles.tileValue}>10</Text>
          <Text style={styles.tileSubText}>mins</Text>
          <FontAwesome name="mobile" size={40} color="#f5a623" />
        </View>
      </View>

      {/* Continuous Use and Longest Off-Screen Tiles */}
      <View style={styles.tileRow}>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Continuous Use</Text>
          <Text style={styles.tileValue}>53</Text>
          <Text style={styles.tileSubText}>mins</Text>
          <MaterialCommunityIcons name="timer-sand" size={40} color="#f5a623" />
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Longest Off-Screen</Text>
          <Text style={styles.tileValue}>3h:15m </Text>
          <FontAwesome name="lock" size={40} color="#f5a623" />
        </View>
      </View>

      {/* Last Drop-Off and First Pick-Up Tiles */}
      <View style={styles.tileRow}>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Last Drop-Off</Text>
          <Text style={styles.tileValue}>01:24</Text>
          <MaterialCommunityIcons name="moon-waning-crescent" size={40} color="#f5a623" />
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>First Pick-Up</Text>
          <Text style={styles.tileValue}>08:39</Text>
          <MaterialCommunityIcons name="weather-sunset" size={40} color="#f5a623" />
        </View>
      </View>

      {/* Past 7 Days Bar Chart */}
      <Text style={styles.chartTitle}>Past 7 Days</Text>
      <BarChart
        data={data}
        width={screenWidth-25}
        height={220}
        chartConfig={{
          backgroundColor: 'red',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          color: ()=>`rgb(245, 166, 35)`,
          propsForLabels: {
            fontSize: 12,
            color: 'green',
            fontWeight: '900',
          },
        }}
        style={{ borderRadius: 10, marginVertical: 10, left: -25, paddingBottom: 20}}
      />

      {/* Most Used Apps and Most Notifications */}

      <View style={{flexDirection:'column',height:'80%',width:'80%'}}>
        <View style={{width:'124%',backgroundColor:'#f0f0f0',padding:10,borderRadius:10,marginBottom:15}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', alignSelf:'left', padding:10 }}>Most Used Apps</Text>
          <Text style={styles.text}> <MaterialCommunityIcons name="instagram" size={38} color="purple" />  Instagram {divprint}   1 hour</Text>
          <Text style={styles.text}> <MaterialCommunityIcons name="whatsapp" size={38} color="#21f21d" />  WhatsApp {divprint} 40 mins</Text>
          <Text style={styles.text}> <MaterialCommunityIcons name="youtube" size={38} color="red" /> YouTube {divprint}     30 mins</Text>
        </View>
        <View style={{width:'124%',backgroundColor:'#f0f0f0',padding:10,borderRadius:10,marginBottom:15}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', alignSelf:'left', padding:10 }}>Most Notifications</Text>
          <Text style={styles.text}> <MaterialCommunityIcons name="email" size={38} color="#f25816" /> Email {kprint}   20</Text>
          <Text style={styles.text}> <MaterialCommunityIcons name="slack" size={38} color="#f238bb" /> Slack {kprint}   15</Text>
          <Text style={styles.text}> <MaterialCommunityIcons name="twitter" size={38} color="#1da4f2" /> Twitter {kprint} 10</Text>
        </View>
      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0,paddingLeft:20,paddingRight:20, backgroundColor: 'white',},
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: 'black' },
  timeContainer: { alignItems: 'center', marginVertical: 20 },
  limitText: { fontSize: 16, color: '#666' },
  timeText: { fontSize: 42, fontWeight: 'bold', color: 'black' },
  subText: { fontSize: 16, color: '#666' },
  progressText: { marginTop: 5, color: '#666' },
  tileRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  tile: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 15, alignItems: 'center', width: '48%' },
  tileTitle: { fontSize: 16, fontWeight: 'bold' },
  tileValue: { fontSize: 30, fontWeight: 'bold', color: 'black' },
  tileSubText: { color: '#666' },
  largeTileRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  largeTile: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 15, width: '48%' },
  chartTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 15, color: 'white', backgroundColor: '#f5a623', padding :10, paddingLeft:20, borderRadius:15, width:'36%' },
  text:{fontSize: 24, padding: 9, backgroundColor:'#f5a623', borderRadius: 15, color: 'white', fontWeight:'500', letterSpacing: 1.3, marginVertical:8, },
});

