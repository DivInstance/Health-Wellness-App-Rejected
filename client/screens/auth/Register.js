import { View, Text, TextInput, Touchable, TouchableOpacity, Image, StyleSheet, TextBase, KeyboardAvoidingView, ScrollView, ScrollViewBase } from 'react-native'
import React, {useState} from 'react'
import InputBox from '../../components/Form/InputBox'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/features/auth/userAction'
import {useReduxStateHook} from './../../hooks/customHook.js'

const Register = ({navigation}) => {
    const RegisterImage = "https://cdn3d.iconscout.com/3d/premium/thumb/css-9848466-7993986.png?f=webp"
    
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [contactNo, setContact] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [bloodGroup, setBloodGroup] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")    

    //Register Function
    const handleRegister =  () => {
        if (!name || !email || !password || !confirmPassword ){
            return alert("Please fill all required fields");
        } 
        const formData = {
            email,password,name,contactNo,age,bloodGroup,height,weight
        }
        dispatch(register(formData))

    // // TODO: Add your API call here to authenticate the user
    //     alert("User registration successful")
    
    //     // navigation.navigate('home') 
    };

    const loading = useReduxStateHook(navigation,"login")

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View  style = {styles.containerA}>
   
        <View style = {styles.containerB}>
            
            <Image source={{ uri:RegisterImage }} style = {styles.image}/>

        <InputBox placeholder={"Enter your name"} value = {name} setValue = {setName} autoComplete={'name'} />
        
        <View style = {{flexDirection:'row'}}>
        <InputBox placeholder={"Gender"} value = {gender} setValue={setGender}/>
        <InputBox placeholder={"Age"} value = {age} setValue={setAge}/>
        <InputBox placeholder={"Blood"} value = {bloodGroup} setValue={setBloodGroup}/>
        </View>

        <View style = {{flexDirection:'row'}}>
        <InputBox placeholder={" Height in cms "} value = {height} setValue={setHeight}/>
        <InputBox placeholder={" Weight in kgs "} value = {weight} setValue={setWeight}/>
        </View>

        <InputBox placeholder={"Enter your email"} value = {email} setValue = {setEmail} autoComplete={'email'} />
        <InputBox value = {password} setValue = {setPassword} placeholder={"Enter your Password"} secureTextEntry={true} />
        <InputBox value = {confirmPassword} setValue = {setConfirmPassword} placeholder={"Re-Enter your Password"} secureTextEntry={true} />
        <InputBox placeholder={"Enter your contact no"} value = {contactNo} setValue={setContact} autoComplete={'tel'}/>
        
       
        <View style = {styles.containerC}>
        
        <TouchableOpacity style = {styles.RegisterButton} onPress={handleRegister}>
            <Text style={styles.textA}>Register New User</Text>
        </TouchableOpacity>

        <Text style={styles.textB} > Already have account? 
            <Text style = {styles.signupText} onPress={()=>navigation.navigate('login')}> Login Now</Text> 
        </Text>

        </View>
        
      </View>
    
    </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
    containerA: {
        justifyContent: "top",
        height: "100%",
        //backgroundColor: "#181818", 
        backgroundColor: "#F2F2F2",       

    },
    containerB: {
        //alignItems: "center",
        top: 48,
        left: 30,
        right: 15,
        down: 15,
        height: "90%",
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
        height:222,
        width: 200,
        alignSelf: "center",
        resizeMode: "contain",
    },
    RegisterButton: {
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


export default Register