import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  borderStyle,
  animatedContainerStyles,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);

  const translateX = useSharedValue(6);
  const translateY = useSharedValue(6);
  const shadowOffsetWidth = useSharedValue(0);
  const shadowOffsetHeight = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(translateX.value, { duration: 300 }) },
        { translateY: withTiming(translateY.value, { duration: 300 }) },
      ],
      ...(Platform.OS === "ios" && {
        shadowOffset: {
          height: withTiming(shadowOffsetHeight.value, {
            duration: 200,
          }),
          width: withTiming(shadowOffsetWidth.value, { duration: 300 }),
        },
      }),
    };
  });

  const onBlur = () => {
    translateX.value = 6;
    translateY.value = 6;
    shadowOffsetWidth.value = 0;
    shadowOffsetHeight.value = 0;
  };

  const onFocus = () => {
    translateX.value = 0;
    translateY.value = 0;
    shadowOffsetWidth.value = 6;
    shadowOffsetHeight.value = 6;
  };

  return (
    <Animated.View
      className={`w-full flex-row border-2 bg-white-200 border-rose-500 h-16 px-4 bg-black-100 rounded-2xl ${borderStyle} focus:border-emerald-500 items-center `}
      style={[
        {
          shadowOffset: { height: 6, width: 6 },
          shadowColor: "#000",
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 0,
        },
        animatedStyles,
      ]}
    >
      <TextInput
        className="flex-1 text-primary font-pregular mb-0.5 text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
        secureTextEntry={
          (title === "Password" || title === "Confirm Password") &&
          !showPassword
        }
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <TouchableOpacity>
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
          style={{ tintColor: "black" }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SearchInput;
