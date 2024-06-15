import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  borderStyle,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View className={`space-y-2  ${otherStyles}`}>
      <Text className="text-base text-gray-200 font-pmedium">{title}</Text>
      <View
        className={` flex-row border-2 bg-white-200 border-rose-500 h-16 px-4 bg-black-100 rounded-2xl ${borderStyle} focus:border-emerald-500 items-center `}
      >
        <TextInput
          className="flex-1 text-primary font-pbold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
