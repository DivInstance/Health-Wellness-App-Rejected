import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ProgressBarAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Layout from '../../components/Layout/Layout';
import {ProgressBar} from '@react-native-community/progress-bar-android';

export default function Exercise({ navigation }) {
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarExpanded(!isCalendarExpanded);
  };

  return (
    <Layout>
    <ScrollView style={styles.container}>
      {/* Header with Account and Settings 
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="user-circle-o" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <MaterialIcons name="settings" size={28} color="black" />
        </TouchableOpacity>
      </View>*/}


      {/* Today's Walking Record */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Today's Walking Record</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </View>

        {/* Circular Progress Bar */}
        <View style={styles.circularProgress}>
          <View style={styles.circle}>
            <Text style={styles.stepCount}>7500</Text>
            <Text style={styles.stepLabel}>Steps</Text>

          </View>
        </View>

        {/* Progress Bar for Walking */}
        <Text style={styles.progressLabel}>Slow Walking & Brisk Walking</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.7}
          color="#f5a623"
        />

        {/* Distance & Calories */}
        <View style={styles.statsContainer}>
          <Text style={styles.statItem}>Distance: 5.2 km</Text>
          <Text style={styles.statItem}>Calories: 350 kcal</Text>
        </View>

        {/* Expandable Calendar */}
        <TouchableOpacity onPress={toggleCalendar}>
          <Text style={styles.expandText}>
            {isCalendarExpanded ? 'Hide Last Week' : 'Show Last Week'}
          </Text>
        </TouchableOpacity>
        {isCalendarExpanded && (
          <View style={styles.calendar}>
            <Text style={styles.calendarText}>Mon - 5000 Steps</Text>
            <Text style={styles.calendarText}>Tue - 8000 Steps</Text>
            <Text style={styles.calendarText}>Wed - 12000 Steps ⭐</Text>
            <Text style={styles.calendarText}>Thu - 4000 Steps</Text>
            <Text style={styles.calendarText}>Fri - 7500 Steps</Text>
            <Text style={styles.calendarText}>Sat - 3000 Steps</Text>
            <Text style={styles.calendarText}>Sun - 9000 Steps</Text>
          </View>
        )}
      </View>

      {/* Running Record */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Running Record</Text>
        </View>
        <View style={styles.runningIcon}>
          <MaterialIcons name="directions-run" size={40} color="black" />
        </View>
        <Text style={styles.goalText}>Goal of this week: 7 km</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.3}
          color="#f5a623"
        />
        <Text style={styles.progressLabel}>30% of Weekly Goal</Text>
      </View>

      {/* Total Calories Burned */}
      <View style={[styles.dashboardCard, { backgroundColor: '#ffe6e6' }]}>
        <Text style={styles.cardTitle}>Total Calories Burned</Text>
        <View style={styles.cardContent}>
          <Text style={styles.bigText}>32 kcal</Text>
          <Icon name="food" size={40} color="black" />
        </View>
        <Text>= 3.2 Banana Chips</Text>
      </View>

      {/* Total Distance */}
      <View style={[styles.dashboardCard, { backgroundColor: '#e6f7ff' }]}>
        <Text style={styles.cardTitle}>Total Distance</Text>
        <View style={styles.cardContent}>
          <Text style={styles.bigText}>0.79 km</Text>
          <Icon name="map-marker-distance" size={40} color="black" />
        </View>
        <Text>= Equivalent to Leaning Tower of Pisa 9.3 times</Text>
      </View>

      {/* Record Exercise Button */}
      <TouchableOpacity style={styles.recordButton}>
        <Text style={styles.recordButtonText}>Record Exercise</Text>
      </TouchableOpacity>
    </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffef6',
    padding: 20,
    marginTop:0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  circularProgress: {
    alignItems: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#f5a623',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressLabel: {
    marginTop: 10,
    fontSize: 14,
    color: 'black',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    fontSize: 14,
    color: 'grey',
  },
  expandText: {
    color: '#f5a623',
    textAlign: 'center',
    marginTop: 10,
  },
  calendar: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fef7e0',
    borderRadius: 10,
  },
  calendarText: {
    fontSize: 14,
    color: 'black',
  },
  dashboardCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bigText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  recordButton: {
    backgroundColor: '#f5a623',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: '30%',
  },
  recordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
