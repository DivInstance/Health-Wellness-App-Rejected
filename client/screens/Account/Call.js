import React, {useState} from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native';
import call from 'react-native-phone-call'

const Call = () => {
    const [inputValue, setInputValue] = useState('9729326759')

    const triggerCall = () => {
        const args = {
            number: inputValue,
            prompt: true,
        };

        //make a call
        call(args).catch(console.error);
    };

  return (

        <View>
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={triggerCall}>           
                {callText}
            </TouchableOpacity>
        </View>
    
  )
}

export default Call