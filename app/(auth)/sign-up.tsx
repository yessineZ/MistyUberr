import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { ScrollView } from 'react-native';
import { icons, images } from '@/constants';
import InputField from './components/InputField';
import CustomButton from './components/customButton';
import OAuth from './components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';
import { fetchAPI } from '@/lib/fetch';
import { clerk } from '@clerk/clerk-expo/dist/provider/singleton';

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

  const { isLoaded, signUp, setActive } = useSignUp(); // Extract here to avoid re-extracting in functions.

  const onSignUpPress = async () => {

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
      });
      Alert.alert('Error',err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        //misty going to set the user in the database 

        await fetchAPI("/api/user",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email ,
            clerkId : completeSignUp.createdUserId , 
            
          })
        })


        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: 'success',
        });
      } else {
        setVerification({
          ...verification,
          state: 'failed',
          error: 'Invalid verification code',
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: 'failed',
        error: err.errors[0].longMessage,
      });
    }
  };

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

        <ReactNativeModal isVisible={verification.state === 'pending'} onModalHide={() => setVerification({...verification , state : 'success'})}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className='text-2xl font-JackartaExtraBold mb-2'>Verification</Text>

            <Text className='font-Jakarta mb-5'>
              We 've sent a verification code to {form.email}
            </Text>
              <InputField
              label='Code'
              icon={icons.lock}
              placeholder='12345'
              value={verification.code}
              keyboardType='numeric'
              onChangeText={(value) => setVerification({...verification, code: value })}
              >
              </InputField>
              {verification.error && (
                <Text className="text-red-500 text-sm mt-1">{verification.error}</Text>
              )}
              <CustomButton title="Verify Email" onPress={onPressVerify} bgVariant='success' className='mt-5' />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === 'success'}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] justify-center items-center">
            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
            <Text className="text-3xl text-center text-gray-400 font-JakartaBold">Verified</Text>
            <Text className='text-base text-gray-400 font-JakartaSemiBold text-center'>You have successfully verified your account .</Text>
            <CustomButton className='mt-5' title="Go Home" onPress={() => router.replace('/(root)/(tabs)/home') } />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
