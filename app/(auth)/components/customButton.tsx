import { ClassAttributes } from "react";
import {  Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { ButtonProps } from "@/types/type";
const getBgVariantStyle = (variant : ButtonProps["bgVariant"]) => {
    switch (variant) {
        case "secondary":
            return "bg-neutral-500";
        case "success":
            return "bg-success-500 ";
        case "danger":
            return "bg-danger-500";
        default:
            return "bg-primary-500 ";
    }
}


const getTextVariantStyle = (variant : ButtonProps["textVariant"]) => {
    switch (variant) {
        case "primary":
            return "text-black";
        case "secondary":
            return "text-gray-100";
        case "danger":
            return "text-red-100";
        case "success" : 
            return "text-green-100";
        default:
            return "text-white";
    }
}

const CustomButton  = ({onPress , title , bgVariant="primary",textVariant,IconLeft,IconRight,className,...props} : ButtonProps ) => (
    <TouchableOpacity onPress={() => onPress} className={`w-full rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)}  ${className}  `} {...props} >
        {IconLeft && <IconLeft></IconLeft>}
        <Text className={`text-lg font-bold p-3  ${getTextVariantStyle(textVariant)}`}>{title}</Text>
        {IconRight && <IconRight></IconRight>}
    </TouchableOpacity>

)

export default CustomButton;