import { View, Text, Image } from "react-native";
import CustomButton from "./customButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = () => {
    // Your Google SignIn logic here
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">OR</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="LogIn with Google"
        className="mt-5 w-full"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
