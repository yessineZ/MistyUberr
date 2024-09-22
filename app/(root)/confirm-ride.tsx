import { View , Text, FlatList } from "react-native";
import RideLayout from "../(auth)/components/RideLayout";
import DriverCard from "../(auth)/components/DriverCard";
import CustomButton from "../(auth)/components/customButton";
import { router } from "expo-router";
import { useDriverStore } from "../store";
const ConfirmRide = () => {
    const { drivers , selectedDriver , setSelectedDriver } = useDriverStore() ; 
   

    return (
        <RideLayout title="Choose a Driver" snapPoints={['65%','85%']}>
            <FlatList data={drivers} renderItem={({item}) => (
                <DriverCard 
                selected={selectedDriver}
                setSelected={() => setSelectedDriver(Number(item.id)!)}
                item={item}></DriverCard>
            )}
            ListFooterComponent={() => (
                <View className="mx-5 mt-10">
                    <CustomButton
                    title="Select Ride"
                    onPress={() => router.push('/(root)/book-ride')}
                    >
                

                    </CustomButton>

                </View>
            )}
            
            >

            </FlatList>
        </RideLayout>
    
    )

}


export default ConfirmRide ; 