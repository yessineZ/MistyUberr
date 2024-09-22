import { Stack, Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import { icons } from "@/constants";
const TabIcon = ({source , focused} : {source : ImageSourcePropType , focused : boolean }) => (
    <View className={`flex flex-row justify-center items-center rounded-full ${focused ? 'bg-general-300' : ''} `}>
        <View className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" :""} `}>
            <Image source={source} tintColor="white" resizeMode="contain" className="w-7 h-7">
            </Image>
        </View>

    </View>
)
const Layout = () => {
    return (
        <Tabs initialRouteName="index" screenOptions={{
            tabBarActiveTintColor : "white",
            tabBarInactiveTintColor : "white",
            tabBarStyle : {
                backgroundColor : "#333333",
                borderRadius : 50 ,
                paddingBottom : 0 ,
                overflow : "hidden",
                marginHorizontal : 20 , 
                marginBottom : 20 , 
                height : 78 ,
                display : "flex",
                alignItems : "center",
                flexDirection : "row",
                position : "absolute"

            },
            tabBarShowLabel: false ,
            

                
            }}>
            <Tabs.Screen name="home" options={{
                title : 'Home',
                tabBarIcon : ({ focused }) => <TabIcon focused={focused} source={icons.home}
                /> 
            }} 
            />

            <Tabs.Screen name="rides" options={{
                title : 'Rides',
                tabBarIcon : ({ focused }) => <TabIcon focused={focused} source={icons.list}
                /> 
            }} 
            />

  

            <Tabs.Screen name="chat" options={{
                title : 'Chat',
                tabBarIcon : ({ focused }) => <TabIcon focused={focused} source={icons.chat}
                /> 
            }}
            />

            <Tabs.Screen name="profile" options={{
                title : 'Profile',
                tabBarIcon : ({ focused }) => <TabIcon focused={focused} source={icons.profile}
                /> 
            }}
            />
            

            
        </Tabs>
    )
}

export default Layout;