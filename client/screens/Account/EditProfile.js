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
import { editProfileAction } from "../../redux/features/auth/userAction";
import { useDispatch } from "react-redux";
import axios from "axios";
import { server } from "../../redux/store";

const EditProfile = () => {
  //Navigation Instance
  const route = useRoute();
  const navigation = useNavigation();

  //State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    localUserData.profilePicture
  );
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("")
  const [contactNo, setContact] = useState("");
  const [age, setAge] = useState("");
  // const [gender, setGender] = useState("")
  const [bloodGroup, setBloodGroup] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  // Redux dispatcher for handling login action
  const dispatch = useDispatch();

  //Update the profile
  const handleUpdate = async () => {
    if (!name || !email) {
      return alert("Please fill all required fields");
    }

    try {
      const updatedUser = {
        name,
        email,
        password,
        contactNo,
        age,
        height,
        weight,
        bloodGroup,
      };
      // console.log(updatedUser);
      const token = await AsyncStorage.getItem("@authToken");
      //hitting node login api request
      const { data } = await axios.put(
        `${server}/user/profile-update`, // Endpoint for updating user data
        updatedUser, // Pass the updated user data here as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(editProfileAction(data));

      navigation.navigate("Account Information", { id: data.user._id });
    } catch (error) {
      console.log(error);
      return alert("Error updating profile.");
    }
  };

  useEffect(() => {
    // Fetch user data from AsyncStorage when component mounts
    const fetchUserDataFromStorage = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("@userData"); // Retrieve stored data
        if (storedUserData !== null) {
          const data = JSON.parse(storedUserData); // Parse stored data

          setName(data.name);
          setEmail(data.email);
          setAge(data.age);
          setContact(data.contactNo);
          setBloodGroup(data.bloodGroup);
          if (data.profilePicture) setProfilePicture(data.profilePicture);
          if (data.height) setHeight(data.height.toString());
          if (data.weight) setWeight(data.weight.toString());
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
          placeholder={"Update height"}
        />
        <InputBox
          value={weight}
          setValue={setWeight}
          placeholder={"Update weight"}
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
