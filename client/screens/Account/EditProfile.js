import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { localUserData } from "../../data/userData";
import Layout from "../../components/Layout/Layout";
import InputBox from "../../components/Form/InputBox";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
  // Access route and navigation hooks
  const route = useRoute();
  const navigation = useNavigation();

  // State variables for user profile information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    localUserData.profilePicture
  );
  const [password, setPassword] = useState("");
  const [contactNo, setContact] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for asynchronous data fetching

  // Handle profile update button press
  const handleUpdate = () => {
    if (!name || !email) {
      return alert("Please fill all required fields");
    }
    alert("Profile updated successfully");
    navigation.navigate("Account Information");
  };

  useEffect(() => {
    // Fetch user data from AsyncStorage when component mounts
    const fetchUserDataFromStorage = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("@userData");
        if (storedUserData !== null) {
          const data = JSON.parse(storedUserData);

          // Update state with fetched data
          setName(data.name);
          setEmail(data.email);
          setContact(data.contactNo);
          setAge(data.age);
          setBloodGroup(data.bloodGroup);
          if (data.height) setHeight(data.height.toString());
          if (data.weight) setWeight(data.weight.toString());
          if (data.profilePicture) setProfilePicture(data.profilePicture);
        }
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error(error); // Handle any errors that occur during data fetching
        setLoading(false); // Ensure loading stops even on error
      }
    };

    fetchUserDataFromStorage();
  }, []);

  if (loading) {
    // Show loading spinner while data is being fetched
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: profilePicture }} />
          <Pressable onPress={() => alert("profile dialog box")}>
            <Text style={{ color: "red" }}>Update your profile picture</Text>
          </Pressable>
        </View>

        <InputBox
          value={name}
          setValue={setName}
          placeholder={"Update your Name"}
          autoComplete={"name"}
        />
        <InputBox
          value={email}
          setValue={setEmail}
          placeholder={"Update your Email"}
          autoComplete={"email"}
        />
        <InputBox
          value={password}
          setValue={setPassword}
          placeholder={"Enter your New Password"}
          autoComplete={"password"}
          secureTextEntry={true}
        />
        <InputBox
          value={contactNo}
          setValue={setContact}
          placeholder={"Enter New Contact No"}
          autoComplete={"contact"}
        />
        <InputBox
          value={age}
          setValue={setAge}
          placeholder={"Update your age"}
        />
        <InputBox
          value={height}
          setValue={setHeight}
          placeholder={"Update height (cm)"}
        />
        <InputBox
          value={weight}
          setValue={setWeight}
          placeholder={"Update weight (kg)"}
        />
        <InputBox
          value={bloodGroup}
          setValue={setBloodGroup}
          placeholder={"Update Blood Group Info"}
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "content",
  },
  updateButton: {
    backgroundColor: "#303030",
    height: 45,
    width: "76.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 42,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default EditProfile;
