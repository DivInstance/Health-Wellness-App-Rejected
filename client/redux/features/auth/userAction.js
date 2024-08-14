import {server} from "../../store"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

//action login 
export const actionLogin = (email,password) => async (dispatch) => {
    try{
        dispatch({
            type:'loginRequest',
        })
        //hitting node login api request
        const { data } = await axios.post(`${server}/user/login`,{email,password},{headers: {'Content-Type': 'application/json'}});
        console.log(data)
        dispatch({
            type:'loginSuccess',
            payload:data.message,
        })
        await AsyncStorage.setItem("@auth", data?.token);
    } catch(error){
        console.log(`error message -> ${error.response.data.message}`)
        dispatch({
            type:'loginFailure',
            payload: error.response.data.message  //|| "Something went wrong line 21 userAction"
        })

    }
}
