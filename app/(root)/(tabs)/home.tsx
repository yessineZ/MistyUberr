import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { Image, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { drivers } from '@/lib/dummyData';
import RideCard from '@/app/(auth)/components/RideCard';
import { icons, images } from '@/constants';
import GoogleTextInput from '@/app/(auth)/components/GoogleTextInput';
import Map from '@/app/(auth)/components/Map';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location' ; 
import { useLocationStore } from '@/app/store';
import { useFetch } from '@/lib/fetch';
export default function Page() {
  const { user } = useUser();
  const { signOut }= useAuth() ; 
  const handleSignOut = () => {
    signOut()  ;
    router.replace('/(auth)/sign-in') ;
  } ; 

  const {setUserLocation , setDestinationLocation} =  useLocationStore() ; 
  const [hasPermession,setHasPermession] = useState(false) ;
   
  const handleDestinationPress = (location : {
    latitude : number , 
    longitude : number ,
    address : string ,
  }) => {
    setDestinationLocation(location)  ;
    router.push("/(root)/findRide") ;
  } ;

  const { data : recentRides , loading } = useFetch(`/(api)/ride/${user?.id}`)
  
  
  useEffect(() => {
    const requestLocation = async () => {
      try {
        let { status} = await Location.requestForegroundPermissionsAsync(); 
        if(status !== 'granted') {
          setHasPermession(false) ;
          return;
        }

        let location = await Location.getCurrentPositionAsync()  ;

        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: `${address[0].name} , ${address[0].region}`,
        });


      }catch(err) {
        console.log(err);
        setHasPermession(false) ;
      }
    }

    requestLocation()  ;
    

   },[])
  return (
    <SafeAreaView>
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image source={images.noResult} className='w-40 h-40' alt='No recent rides found' resizeMode='contain' />
                <Text className='text-sm'>No results found</Text>
              </>
            ) : (
            <Text>Loading</Text>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
          <View className='flex items-center justify-between flex-row my-5'>
            <Text className='font-JakartaBold text-xl'>Welcome , <Text className='text-green-500 capitalize'>{user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0]}</Text> </Text>
           <TouchableOpacity onPress={handleSignOut} className='justify-center items-center w-10 h-10  absolute right-0'>
              <Image source={icons.out} className='w-4 h-4'></Image>
            </TouchableOpacity>
          </View>

            <GoogleTextInput icon={icons.google} 
            containerStyle='bg-white shadow-md shadow-neutral-300'
            handlePress={handleDestinationPress} />
        
            <>
              <Text className='text-xl font-JakartaBold mt-5 mb-3'>
                Your Current Loacation
              </Text>
              <View className='flex flex-row items-center bg-transparent h-[300px]'>
                <Map></Map>
              </View>
            </>

            <Text className='text-xl font-JakartaBold mt-5 mb-3'>
              Recent Rides
            </Text>


          

          </>
        )}
      />
    </SafeAreaView>
  );
}
