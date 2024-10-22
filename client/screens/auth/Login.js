import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Form/InputBox";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../redux/features/auth/userAction";
import { useReduxStateHook } from "../../hooks/customHook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
 
const Login = ({ navigation }) => {
  // URLs for the login and background images
  const LoginImage =
    "https://static.vecteezy.com/system/resources/previews/027/241/646/original/3d-icon-login-security-png.png";
  const BackImage =
    "https://img.freepik.com/free-vector/medical-technology-science-background-vector-blue-with-blank-space_53876-117739.jpg";

  // State variables for email, password, and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redux dispatcher for handling login action
  const dispatch = useDispatch();

  //global state
  //const {loading,error, message}=useSelector((state)=>state.user) //state.user since we had user:userReducer in store.js

  //const loading = useReduxStateHook(navigation,"Home Page")

  // Hook to track loading state from global Redux store
  const isLoading = useReduxStateHook(navigation, "Home Page");

  // Function to handle login process
  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please enter your email address and password");
    }

    // TODO: Add your API call here to authenticate the user

    setLoading(true); // Set loading state while the login request is being processed

    try {
      // Make API request to authenticate the user
      const response = await axios.post(
        "http://10.7.239.91:8082/api/v1/user/login",
        { email: email, password: password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      // Store user information and authentication token in AsyncStorage
      await AsyncStorage.setItem("@userData", JSON.stringify(data.user));
      await AsyncStorage.setItem("@authToken", data.token);

      // Dispatch login action to update Redux state
      dispatch(actionLogin(email, password));

      // Navigate to the Home Page after successful login
      navigation.navigate("Home Page");
    } catch (error) {
      setLoading(false); // Reset loading state if there's an error
      //   console.error(error);
      return alert("Wrong email or password.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  //life cycle
  // useEffect(()=>{
  //     if(error){
  //         alert(error);
  //         dispatch({type:'clearError'})
  //     }
  //     if(message){
  //         alert(message);
  //         dispatch({type:'clearMessage'})
  //         navigation.navigate('Home Page')
  //     }
  // },[error,message])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-500}
      style={styles.containerA}
    >
      <View style={styles.containerB}>
        <Image source={{ uri: LoginImage }} style={styles.image} />
        {loading && <Text>loading...</Text>}

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

        <View style={styles.containerC}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.textA}>Login Now</Text>
          </TouchableOpacity>

          <Text style={styles.textB}>
            {" "}
            Don't have an Account?
            <Text
              style={styles.signupText}
              onPress={() => navigation.navigate("register")}
            >
              {" "}
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  containerA: {
    justifyContent: "top",
    height: "100%",
    //backgroundColor: "#181818",
    backgroundColor: "#F2F2F2",
  },
  containerB: {
    //alignItems: "center",
    top: 100,
    left: 30,
    right: 15,
    down: 15,
    height: "75%",
    width: "84%",
    //backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 15,
  },
  containerC: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
  loginButton: {
    alightSelf: "center",
    backgroundColor: "#00308F",
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
