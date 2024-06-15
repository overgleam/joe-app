import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-start items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-2xl text-center font-pextrabold mt-2 text-primary">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-primary">{subtitle}</Text>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
        animatedContainerStyles="bg-emerald-500"
      />
    </View>
  );
};

export default EmptyState;
