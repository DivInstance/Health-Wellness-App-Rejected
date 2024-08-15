import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, {useState, useEffect} from 'react'
import InputBox from '../../components/Form/InputBox'

//redux hooks
import {useSelector,useDispatch} from 'react-redux'
import { actionLogin } from '../../redux/features/auth/userAction'
import { useReduxStateHook } from '../../hooks/customHook'

const Login = ({navigation}) => {
    const LoginImage = "https://static.vecteezy.com/system/resources/previews/027/241/646/original/3d-icon-login-security-png.png"
    const BackImage = "https://img.freepik.com/free-vector/medical-technology-science-background-vector-blue-with-blank-space_53876-117739.jpg"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //hooks
    const dispatch = useDispatch()
    //global state
    //const {loading,error, message}=useSelector((state)=>state.user) //state.user since we had user:userReducer in store.js

    const loading = useReduxStateHook(navigation,"Home Page")

    //Login Function
    const handleLogin =  () => {
        if (!email || !password ){
            return alert("Please enter your email address and password");
        }
    // TODO: Add your API call here to authenticate the user
        
        dispatch(actionLogin(email,password));    
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
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset = {-500} style = {styles.containerA}>               
        <View style = {styles.containerB}>
            
            <Image source={{ uri:LoginImage }} style = {styles.image}/>
            {loading && <Text>loading...</Text>}
      
        <InputBox placeholder={"Enter your email"} value = {email} setValue = {setEmail} autoComplete={'email'} />
        <InputBox value = {password} setValue = {setPassword} placeholder={"Enter your Password"} secureTextEntry={true} />

        <View style = {styles.containerC}>
        
        <TouchableOpacity style = {styles.loginButton} onPress={handleLogin}>
            <Text style={styles.textA}>Login Now</Text>
        </TouchableOpacity>

        <Text style={styles.textB} > Don't have an Account? 
            <Text style = {styles.signupText} onPress={()=>navigation.navigate('register')}> Sign Up</Text> 
        </Text>

        </View>

      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

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
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius:15,
    
    },
    containerC : {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height:250,
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
    textB : {
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
})