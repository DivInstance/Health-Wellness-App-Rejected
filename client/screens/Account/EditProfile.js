import { View, Text, StyleSheet, ScrollView, Image, Pressable   , TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { userData } from '../../data/userData'
import Layout from '../../components/Layout/Layout'
import InputBox from '../../components/Form/InputBox'
import { useRoute, useNavigation } from '@react-navigation/native'

const EditProfile = () => {

    //Navigation Instance
    const route = useRoute()
    const navigation = useNavigation()

    //State variables for form inputs
    const [name, setName] = useState(userData.name)
    const [email, setEmail] = useState(userData.email)
    const [profilePicture, setProfilePicture] = useState(userData.profilePicture)
    const [password, setPassword] = useState(userData.password)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [contactNo, setContact] = useState(userData.contactNo)
    const [age, setAge] = useState(userData.age)
    const [gender, setGender] = useState(userData.gender)
    const [bloodGroup, setBloodGroup] = useState(userData.bloodGroup)
    const [height, setHeight] = useState(userData.height)
    const [weight, setWeight] = useState(userData.weight)    

    //Update the profile
    const handleUpdate =  () => {
        if (!name || !email ){
            return alert("Please fill all required fields");
        }
        alert("Profile updated successfully")
        navigation.navigate('Account Information')
    }


  return (
    
        <View style = {styles.container}>
            <ScrollView>
                <View style = {styles.imageContainer}>
                    <Image style  = {styles.image} source = {{uri:profilePicture}}/>
                    <Pressable onPress = {()=>alert('profile dialog box')}>
                        <Text style={{color:'red'}}>Update your profile picture</Text>
                    </Pressable>
                </View>                      
                        
                     <InputBox value={name} setValue={setName} placeholder={"Update your Name"} autoComplete={"name"}/>                 
                     <InputBox value={email} setValue={setEmail} placeholder={"Update your Email"} autoComplete={"email"}/>                 
                     <InputBox value={password} setValue={setPassword} placeholder={"Enter your New Password"} autoComplete={"password"} secureTextEntry={true}/>                 
                     <InputBox value={contactNo} setValue={setContact} placeholder={"Enter New Contact No"} autoComplete={"contact"}/>     
                     <InputBox value={age} setValue={setAge} placeholder={"Update your age"}/>
                     <InputBox value={height} setValue={setHeight} placeholder={"Update height"} />          
                     <InputBox value={weight} setValue={setWeight} placeholder={"Update weight"} />          
                     <InputBox value={bloodGroup} setValue={setBloodGroup} placeholder={"Update Blood Group Info"} />          
                
                <TouchableOpacity style = {styles.updateButton} onPress={handleUpdate}>
                    <Text style = {styles.updateButtonText}>Update Profile</Text>
                </TouchableOpacity>
                
            </ScrollView>

        </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,        
    },
    imageContainer : {
        justifyContent:'center',
        alignItems:'center',
    },
    image : {
        height: 100,
        width: 100,
        resizeMode: "content",
    },
    updateButton : {
        backgroundColor: '#303030',
         height: 45,
         width: "76.5%",
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: 10,
         marginTop: 10,
         marginLeft: 42,
    },
    updateButtonText : {
        color: '#fff',
        fontSize: 18,
    },
})


export default EditProfile