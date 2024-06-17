import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, containerStyles, titleStyles, subtitle }) => {
  return (
    <View className={`${containerStyles}`}>
      <Text className={`text-primary text-center font-bold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-200 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
