import { View, Text,TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Image, Platform, Keyboard } from 'react-native'
import React from 'react'
import { InputFieldProps } from '@/types/type'

const InputField = ({label , labelStyle , icon , secureTextEntry = false ,containerStyle , inputStyle , iconStyle , className , ...props } : InputFieldProps) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='my-2 w-full'>
                <Text className={`text-lg ${labelStyle} font-JakartaSemiBold mb-3`}>{label}</Text>
            <View className={` flex flex-row items-center justify-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}>
                {icon && (
                    <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle} `} />
                )}
                <TextInput
                    secureTextEntry={secureTextEntry}
                    className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left` }
                    {...props}
                />

                
            </View>
        </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default InputField