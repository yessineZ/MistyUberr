import { Text , View} from "react-native";
import { useLocationStore } from "../store";
import RideLayout from "../(auth)/components/RideLayout";
import GoogleTextInput from "../(auth)/components/GoogleTextInput";
import { icons } from "@/constants";
import CustomButton from "../(auth)/components/customButton";
import { router } from "expo-router";

const FindRide = () => {
    const { userAddress , destinationAddress , setDestinationLocation , setUserLocation } = useLocationStore() ; 

 return (
    <RideLayout title="Ride" snapPoints={['85%']}>
        <View className="my-3">
            <Text className="text-lg font-JakartaSemiBold mb-3">From : </Text>
            <GoogleTextInput 
            icon={icons.target} 
            initialLocation={userAddress || ""}
            containerStyle="bg-neutral-400"
            textInputBackgroundColor="#f5f5f5"
            handlePress={(location) => setUserLocation(location)}
            >

            </GoogleTextInput>

        </View>



        <View className="my-3">
            <Text className="text-lg font-JakartaSemiBold mb-3">To : </Text>
            <GoogleTextInput 
            icon={icons} 
            initialLocation={userAddress || ""}
            containerStyle="bg-neutral-400"
            textInputBackgroundColor="transparent"
            handlePress={(location) => setDestinationLocation(location)}
            >

            </GoogleTextInput>

        </View>

        <CustomButton title="Find now" onPress={() => router.push('/(root)/confirm-ride')} className="mt-5">
        </CustomButton>
    </RideLayout >
 )
}

export default FindRide ; 