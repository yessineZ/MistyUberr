import { Stack } from "expo-router"





const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown : false }}></Stack.Screen>
            <Stack.Screen name="findRide" options={{headerShown : false}}></Stack.Screen>
            <Stack.Screen name="confirm-ride" options={{headerShown : false}}></Stack.Screen>
            <Stack.Screen name="book-ride" options={{headerShown : false}}></Stack.Screen>

        </Stack>
    )
}