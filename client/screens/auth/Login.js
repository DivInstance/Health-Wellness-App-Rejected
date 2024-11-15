import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Form/InputBox";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../redux/features/auth/userAction";
import { useReduxStateHook } from "../../hooks/customHook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "../../redux/store";

const Login = ({ navigation }) => {
  const LoginImage =
    "https://static.vecteezy.com/system/resources/previews/027/241/646/original/3d-icon-login-security-png.png";
  const BackImage =
    "https://img.freepik.com/free-vector/medical-technology-science-background-vector-blue-with-blank-space_53876-117739.jpg";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useReduxStateHook(navigation, "Home Page");

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please enter your email address and password");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${server}/user/login`,
        { email: email, password: password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      await AsyncStorage.setItem("@userData", JSON.stringify(data.user));
      await AsyncStorage.setItem("@authToken", data.token);

      dispatch(actionLogin(email, password));

      navigation.navigate("Home Page");
    } catch (error) {
      setLoading(false);
      return alert("Wrong email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-500}
      style={styles.containerA}>
        
      <ImageBackground source={require('../../assets/login.jpg')} style={styles.backgroundImage}>
        <View style={styles.containerBWrapper}>
          <View style={styles.containerB}>
            <Image source={{ uri: LoginImage }} style={styles.image} />
            {loading && <Text>loading...</Text>}

            <View style={styles.innerContainer}>
              <InputBox
                placeholder={"Enter your email"}
                value={email}
                setValue={setEmail}
                autoComplete={"email"}
              />
              <InputBox
                value={password}
                setValue={setPassword}
                placeholder={"Enter your Password"}
                secureTextEntry={true}
              />
            </View>

            <View style={styles.containerC}>
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.textA}>Login Now</Text>
              </TouchableOpacity>

              <Text style={styles.textB}>
                Don't have an Account?
                <Text
                  style={styles.signupText}
                  onPress={() => navigation.navigate("register")}
                >
                   {" "}Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  containerA: {
    justifyContent: "top",
    height: "100%",
    backgroundColor: "#fffef6",
  },
  containerBWrapper: {
    flex: 1,
  },
  containerB: {
    top: 100,
    left: 30,
    right: 15,
    down: 15,
    height: "63%",
    width: "84%",
    backgroundColor: "rgba(255, 255, 255, 0.69)", // Semi-transparent background
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 15,
    padding: 20, // Added padding to give inner elements space
  },
  innerContainer: {
    backgroundColor: 'transparent',
  },
  containerC: {
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "center",
  },
  image: {
    height: 250,
    width: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
  loginButton: {
    alignSelf: "center",
    backgroundColor: "#f5a623",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    width: "78%",
    alignItems: "center",
    marginHorizontal: 40,
  },
  textA: {
    color: "white",
    fontWeight: "500",
  },
  textB: {
    alignSelf: "center",
    fontSize: 16,
    marginTop: 30,
  },
  signupText: {
    marginTop: 30,
    color: "#00308F",
    alignSelf: "center",
    fontSize: 16,
  },
});
