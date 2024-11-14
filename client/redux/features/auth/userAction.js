import { server } from "../../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//action login
export const actionLogin = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });
    //hitting node login api request
    // const { data } = await axios.post(
    //   `${server}/user/login`,
    //   { email, password },
    //   { headers: { "Content-Type": "application/json" } }
    // );
    console.log(`login error now  - ${data}`);
    dispatch({
      type: "loginSuccess",
      payload: data,
    });
    await AsyncStorage.setItem("@userData", JSON.stringify(data.user));
    await AsyncStorage.setItem("@authToken", data.token);
    // const storedToken = await AsyncStorage.getItem('@authToken');
    // console.log(`Stored Token: ${storedToken}`);
  } catch (error) {
    console.log(`error message -> ${error.response.data.message}`);

    dispatch({
      type: "loginFailure",
      payload: error.response.data.message,
    });
  }
};

//user register
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });

    //hitting node register api request
    const { data } = await axios.post(`${server}/user/register`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: "registerSuccess",
      payload: data,
    });
    await AsyncStorage.setItem("@userData", JSON.stringify(data.user));

  } catch (error) {
    console.log(error);
    dispatch({
      type: "registerFailure",
      payload: error.response.data.message,
    });
  }
};

//Get user data action
export const getUserData = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUserDataRequest",
    });
    //hitting node profile api request

    //get token
    const token = await AsyncStorage.getItem("@authToken");

    const { data } = await axios.post(
      `${server}/user/profile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "getUserDataSuccess",
      payload: data?.user,
    });

    await AsyncStorage.setItem("@userData", data?.user);
  } catch (error) {
    console.log(`error message -> ${error.response.data.message}`);
    dispatch({
      type: "getUserDataFailure",
      payload: error.response.data.message,
    });
  }
};

//Logout User action
export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    //token request
    // const token = await AsyncStorage.getItem("@authToken");

    //hitting node logout api request
    const { data } = await axios.get(`${server}/user/logout`);

    console.log(`Logout data - ${data}`);
    dispatch({
      type: "logoutSuccess",
      payload: data?.message,
    });
  } catch (error) {
    console.log(` userActions 68 : error -> ${error}`);
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

// EditProfile action
export const editProfileAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "editProfileRequest",
    });

    

    dispatch({
      type: "editProfileSuccess",
      payload: data,
    });
      
    await AsyncStorage.setItem("@userData", JSON.stringify(data.user));
    
  } catch (error) {
    console.log(`error message -> ${error.response.data.message}`);

    dispatch({
      type: "editProfileFailure",
      payload: error.response.data.message,
    });
  }
};
