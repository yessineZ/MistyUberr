import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { ScrollView } from 'react-native';
import { icons, images } from '@/constants';
import InputField from './components/InputField';
import CustomButton from './components/customButton';
import OAuth from './components/OAuth';
import ReactNativeModal from 'react-native-modal';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });


  const onSignUpPress = async () => {
   
    }


  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View>
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
            icon={icons.person}
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            icon={icons.email}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            icon={icons.lock}
            secureTextEntry={true}
          />

          <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6"></CustomButton>

          <OAuth />

          <Link href="/(auth)/sign-in" className="text-center text-lg text-general-200 mt-10">
            <Text>Already Have an Account?</Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>

        <ReactNativeModal isVisible={verification.state === 'success'}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] justify-center items-center">
            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
            <Text className="text-lg text-center text-primary-500">Account created successfully!</Text>
            <CustomButton title="Close" onPress={() => setVerification({ ...verification, state: 'default' })} />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}

export default SignUp;
