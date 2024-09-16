import { SafeAreaView } from "react-native-safe-area-context"
import { Text, TouchableOpacity } from "react-native" ;
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef } from "react";
import { View } from "react-native";
import { useState } from "react";
import { onboarding } from "@/constants";
import { Image } from "react-native";
import CustomButton from "./components/customButton";
const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null) ; 
    const [activeIndex,setActiveIndex] = useState(0) ; 
    const isLastSlide = activeIndex === onboarding.length - 1 ;  
    return (
        <SafeAreaView className="bg-white flex h-full items-center justify-between relative">
            <TouchableOpacity className="w-full flex justify-end items-end p-5" onPress={() => router.replace('/(auth)/sign-up') } >
                <Text className="text-black text-md font-JakartaBold">Skip</Text>
            </TouchableOpacity>

            <Swiper ref={swiperRef} loop={false} dot={<View className="w-[32px] h-[4px] mx-1] bg-[#E2E]"></View> } 
            activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full"></View>}           
            onIndexChanged={(index) => setActiveIndex(index)}>
                
                {onboarding.map((item) => (
                    <View key={item.id} className="flex justify-center items-center w-full h-[250px] bg-[#F9F9FC] p-10 rounded-lg shadow-md">
                        <Image source={item.image}
                        className="w-full h-[300px]"
                        resizeMode="contain">

                        </Image>
                        <Text className="text-2xl font-JakartaBold text-center">{item.title}</Text>
                        <Text className="text-md font-JakartaRegular text-center">{item.description}</Text>
                    </View>
                ))}

                
            </Swiper>


            <CustomButton title={isLastSlide ? 'Get Started' : "Next"} className="w-11/12 mt-10" onPress={() => isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)}    />




        </SafeAreaView>
    )
}

export default Onboarding;
