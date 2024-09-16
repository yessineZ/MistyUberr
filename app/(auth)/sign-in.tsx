import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { ScrollView } from 'react-native';
import { icons, images } from '@/constants';
import InputField from './components/InputField';
import CustomButton from './components/customButton';
import OAuth from './components/OAuth';
const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = () => {

  }

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            Welcome 
          </Text>
        </View>

        <View className='p-5'>
            
          <InputField
            label='Email'
            placeholder='Enter your email'
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            icon={icons.email}
          />


          <InputField
            label='password'
            placeholder='Enter your password'
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            icon={icons.lock}
            secureTextEntry={true}

          />



          <CustomButton title='Sign In' onPress={onSignInPress} className='mt-6'></CustomButton>
          
          <OAuth />
          
          <Link href='/(auth)/sign-up' className='text-center text-lg text-general-200 mt-10'>
                <Text>Dont have an account  ? </Text>
                <Text className='text-primary-500'>SignUp</Text>
          </Link>

        </View>


        </View>
    </ScrollView>
  );
};

export default SignUp;
