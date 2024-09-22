import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/app/(auth)/components/customButton'
import { router } from 'expo-router'
const chat = () => {
  return (
    <SafeAreaView>
        <Text className='text-success-500'>Chat Page</Text>
         <CustomButton
              title="Browse Home"
              onPress={() => router.push(`/(root)/findRide`)}
              className="mt-5"
            />
    </SafeAreaView>
      
  )
}

export default chat