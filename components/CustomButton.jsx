import { View, Text, Pressable, Platform } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  animatedContainerStyles,
  textStyles,
  isLoading,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const shadowOffsetWidth = useSharedValue(6);
  const shadowOffsetHeight = useSharedValue(6);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(translateX.value, { duration: 200 }) },
        { translateY: withTiming(translateY.value, { duration: 200 }) },
      ],
      ...(Platform.OS === "ios" && {
        shadowOffset: {
          height: withTiming(shadowOffsetHeight.value, {
            duration: 200,
          }),
          width: withTiming(shadowOffsetWidth.value, { duration: 200 }),
        },
      }),
      ...(Platform.OS === "android" && {
        elevation: withTiming(translateX.value === 0 ? 6 : 0, {
          duration: 200,
        }),
      }),
    };
  });

  const handlePressIn = () => {
    translateX.value = 6;
    translateY.value = 6;
    shadowOffsetWidth.value = 0;
    shadowOffsetHeight.value = 0;
  };

  const handlePressOut = () => {
    translateX.value = 0;
    translateY.value = 0;
    shadowOffsetWidth.value = 6;
    shadowOffsetHeight.value = 6;
  };

  return (
    <View className={`${containerStyles} ${isLoading ? "opacity-50" : ""}`}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <Animated.View
          className={`bg-rose-500 px-6 py-4 rounded-2xl border items-center border-black ${animatedContainerStyles}`}
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
          <Text className={`text-primary font-pvariable ${textStyles}`}>
            {title}
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default CustomButton;
