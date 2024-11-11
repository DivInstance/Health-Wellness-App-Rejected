// Home.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from 'react-native-progress/Bar';
import { LineChart } from 'react-native-chart-kit';
import Layout from '../../components/Layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../../redux/features/auth/userAction';

const screenWidth = Dimensions.get('window').width;

const screenTimeData = {
  screenTime: '5h 30m',
  averageUse: '3h 45m',
  pickups: 40,
  continuousUse: '1h 15m',
};

const hydrationLevel = 0.6; // 60% hydration level
const stepsTaken = 7500;
const kmWalked = 5.2;
const caloriesBurned = 350;

const exerciseChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{ data: [3000, 5000, 6000, 7500, 8500, 7000, 9000], strokeWidth: 2 }],
};

const Metric = React.memo(({ icon, value, label }) => (
  <View style={styles.illustration}>
    <Icon name={icon} size={30} color="black" />
    <Text style={styles.metric}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
));

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserData());
    console.log(`Authentication Flag (Home.js) - ${isAuthenticated}`);
  }, [dispatch]);

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <SectionTitle title="HEALTH STATS" />
        <DashboardCard title="Digital Wellbeing">
          <View style={styles.digitalWellbeingContainer}>
            <Metric icon="timer-sand" value={screenTimeData.screenTime} label="Screen Time" />
            <Metric icon="clock-outline" value={screenTimeData.averageUse} label="Avg Use" />
            <Metric icon="cellphone-arrow-down" value={screenTimeData.pickups} label="Pickups" />
            <Metric icon="timer" value={screenTimeData.continuousUse} label="Continuous Use" />
          </View>
          <Button style={styles.button} onPress={() => alert('Eye Protection Activated')} label="Eye Protection" />
        </DashboardCard>

        <DashboardCard title="Drink Water">
          <View style={styles.waterButtonsContainer}>
            {[150, 300, 450, 600, 750].map((amount, index) => (
              <WaterDropButton key={index} amount={amount} />
            ))}
          </View>
          <ProgressBar
            progress={hydrationLevel}
            width={screenWidth * 0.8}
            color="#4d9cdb"
            unfilledColor="#e0e0e0"
            borderWidth={0}
            style={styles.progressBar}
          />
          <Text style={styles.hydrationText}>{Math.round(hydrationLevel * 100)}% Hydrated</Text>
        </DashboardCard>

        <DashboardCard title="Exercise">
          <LineChart
            data={exerciseChartData}
            width={screenWidth * 0.9}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: () => `#f5a623`,
              labelColor: () => `black`,
              strokeWidth: 2,
            }}
            bezier
          />
          <View style={styles.exerciseStats}>
            <Metric icon="walk" value={stepsTaken} label="Steps" />
            <Metric icon="map-marker-distance" value={`${kmWalked} km`} label="Distance" />
            <Metric icon="fire" value={caloriesBurned} label="Calories" />
          </View>
          <Button style={styles.button}  label="Start Exercise" />
        </DashboardCard>
      </ScrollView>
    </Layout>
  );
};

const SectionTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.titleText}>{title}</Text>
  </View>
);

const DashboardCard = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const WaterDropButton = ({ amount }) => (
  <TouchableOpacity style={styles.waterDrop}>
    <MaterialIcons name="water-drop" style={styles.waterDropIcon} />
    <Text>{amount}ml</Text>
  </TouchableOpacity>
);

const Button = ({ onPress, label }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffef6',
    padding: 16,
    marginTop:'7.5%',
    marginBottom:'20%',
  },
  titleContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    opacity: 0.8,
    letterSpacing: 2,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  digitalWellbeingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  illustration: {
    alignItems: 'center',
  },
  metric: {
    fontSize: 18,
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    color: 'gray',
  },
  progressBar: {
    marginVertical: 10,
  },
  hydrationText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#f5a623',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  waterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  waterDrop: {
    margin: 5,
    alignItems: 'center',
  },
  waterDropIcon: {
    color: '#2389da',
    fontSize: 18,
  },
});

export default Home;
