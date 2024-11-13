import {View,Text,Image,StyleSheet,TouchableOpacity,Button,Linking,ActivityIndicator,} from "react-native";
import { React, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { localUserData } from "../../data/userData";
import AntDesign from "react-native-vector-icons/AntDesign.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useReduxStateHook } from "../../hooks/customHook";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/features/auth/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DownloadDataButton from "./Download";

const Account = () => {
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const route = useRoute(); // Get current route
  const navigation = useNavigation(); // Navigation instance
  const isLoading = useReduxStateHook(navigation, "login"); // Check if login is still loading from Redux
  const dispatch = useDispatch(); // Dispatch to trigger actions

  useEffect(() => {
    // Fetch user data from AsyncStorage when component mounts
    const fetchUserDataFromStorage = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("@userData"); // Retrieve stored data
        if (storedUserData !== null) {
          const data = JSON.parse(storedUserData); // Parse stored data

          // Set default values for missing user data fields
          data.bloodGroup = data.bloodGroup || "NA";
          data.gender = data.gender || "NA";
          data.contactNo = data.contactNo || "NA";
          data.height = data.height || "NA";
          data.weight = data.weight || "NA";
          data.profilePicture = data.profilePicture || "NA";

          setUserData(data); // Update state with the fetched data
        } else {
          throw new Error("No user data found");
        }
        setLoading(false); // Stop loading
      } catch (error) {
        console.error(error); // Log errors
        setLoading(false); // Stop loading even if an error occurs
      }
    };
    fetchUserDataFromStorage();
  }, []);
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
  }
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.ProfileContainer}>  
          <Image
            style={styles.profilePicture}
            source={{uri:localUserData.profilePicture }}
          />
          
          {/*source={{ uri: userData.profilePicture }}*/}

          <Text
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: "bold",
              letterSpacing:1.5,
              textTransform: "uppercase",
              alignSelf: "center",
            }}
          >
            {userData.name}
          </Text>

          <View style={styles.userDetails}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Fontisto name="blood-drop" style={{ color: "red" }} />
              <Text
                style={{
                  fontWeight: "300",
                  fontSize: 18,
                  padding: 1.5,
                  color: "white",
                }}
              >
                {" "}
                {userData.bloodGroup}
              </Text>
            </View>

            <Text style={styles.infoClass}>
              {" "}
              email : <Text style={styles.infoData}>{userData.email}</Text>
            </Text>
            <Text style={styles.infoClass}>
              contact: <Text style={styles.infoData}>{userData.contactNo}</Text>
            </Text>
            <Text style={styles.infoClass}>
              {" "}
              height :
              <Text style={styles.infoData}>
                {" "}
                {userData.height + " cm"}
                <Text style={{ fontWeight: "400" }}>
                  {" "}
                  weight : <Text style={styles.infoData}></Text>
                  <Text style={styles.infoData}>
                    {userData.weight + " kg"}
                    <Text style={{ fontWeight: "400" }}>
                      {" "}
                      gender:{" "}
                      <Text style={styles.infoData}>{userData.gender}</Text>
                    </Text>
                  </Text>
                </Text>
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.accountContainer}>
          <Text style={styles.heading}> Account Settings </Text>

          <View style={{ marginTop: 15 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("profile", { id: userData._id })
              }
            >
              <AntDesign name="edit" style={styles.button} />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("notifications")}
            >
              <MaterialIcons name="notifications-none" style={styles.button} />
              <Text style={styles.buttonText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <AntDesign name="download" style={styles.button} />
              <Text style={styles.buttonText}>Download my Data</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <AntDesign name="filetext1" style={styles.button} />
              <Text
                style={styles.buttonText}
                onPress={() =>
                  Linking.openURL(
                    "https://docs.google.com/document/d/1JW7rxpxPqdMvcX_WCz0x0vPieGznUUKjH3_jst1Uf84/edit#heading=h.p1miavl8ze90"
                  )
                }
              >
                Documentation
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <AntDesign name="wallet" style={styles.button} />
              <Text
                style={styles.buttonText}
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/DivInstance/Health-Wellness-App"
                  )
                }
              >
                Project Repository
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("developer")}>
              <FontAwesome name="connectdevelop" style={styles.button} />
              <Text style={styles.buttonText}>Developers of the Project</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginTop: 18 }}>
              <TouchableOpacity
                style={styles.emergencyButton}
                onPress={() => navigation.navigate("emergency")}
              >
                <MaterialIcons
                  name="contact-emergency"
                  style={{
                    flexDirection: "row",
                    padding: 7.5,
                    fontSize: 16.5,
                    color: "white",
                  }}
                />
                <Text style={styles.logoutText}>Emergency Contact</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={async () => {
                  dispatch(logoutAction());
                  await AsyncStorage.removeItem("@auth");
                }}
              >
                <AntDesign
                  name="logout"
                  style={{
                    flexDirection: "row",
                    padding: 7.5,
                    fontSize: 15,
                    color: "white",
                  }}
                />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginVertical: 20,
    marginTop: 15,
    marginLeft: 3,
    padding:7.5,
    backgroundColor: '#fffef6',
  },
  profilePicture: {
    height: 120,
    width: "100%",
    resizeMode: "contain",
  },
  infoClass: {
    fontWeight: "700",
    fontSize: 16.5,
    padding: 1.5,
    color: "white",
    bottom: 0,
  },
  infoData: {
    fontWeight: "400",
  },

  userDetails: {
    marginTop: 10,
    marginBottom: 10,
    justifyConten: "center",
    alignItems: "center",
  },
  ProfileContainer: {
    //backgroundColor: "#17153B",
    backgroundColor: "#f5a623",
    //backgroundColor: "#373A40",
    borderRadius: 15,
    paddingBottom:10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  accountContainer: {
    padding: 10,
    backgroundColor: "white",
    marginTop: 10,
    marginVertical: 10,
    elevation: 3,
    borderRadius: 10,
    paddingBottom: 10,
  },
  heading: {
    fontSize: 21,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  button: {
    flexDirection: "row",
    padding: 6,
    fontSize: 18,
  },
  buttonText: {
    fontSize: 18,
    marginRight: 15,
    padding: 4.5,
  },
  logoutButton: {
    marginLeft: 45,
    width: "30%",
    backgroundColor: "red",
    flexDirection: "row",
    borderRadius: 10,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  emergencyButton: {
    marginLeft: 18,
    width: "48%",
    backgroundColor: "#26CC00",
    flexDirection: "row",
    borderRadius: 10,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    paddingRight: 9,
  },
  logoutText: {
    color: "white",
    fontSize: 18,
  },
});

export default Account;
