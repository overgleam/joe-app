import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-primary font-pextrabold text-center">
              Created by the greatest{" "}
              <Text className="text-rose-500 font-pbold">Joseph Alforque</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[250px] h-[18px] absolute -bottom-2 -right-8 -z-50"
              style={{ tintColor: "#af73e6" }}
              resizeMode="contain"
            />
          </View>

          <Text className="text-black text-sm font-pregular mt-7 text-center">
            Together we can make great things happen because everyday is a
            savings day. Tara let's Go!
          </Text>

          <CustomButton
            title={"Continue to Login"}
            containerStyles="w-full mt-7"
            handlePress={() => router.push("/sign-in")}
            textStyles=""
          />
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
