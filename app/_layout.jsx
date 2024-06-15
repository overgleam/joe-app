import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import GlobalProvider from "../context/GlobalProvider";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "CabinetGrotesk-Thin": require("../assets/fonts/CabinetGrotesk-Thin.ttf"),
    "CabinetGrotesk-Extralight": require("../assets/fonts/CabinetGrotesk-Extralight.ttf"),
    "CabinetGrotesk-Light": require("../assets/fonts/CabinetGrotesk-Light.ttf"),
    "CabinetGrotesk-Regular": require("../assets/fonts/CabinetGrotesk-Regular.ttf"),
    "CabinetGrotesk-Medium": require("../assets/fonts/CabinetGrotesk-Medium.ttf"),
    "CabinetGrotesk-Bold": require("../assets/fonts/CabinetGrotesk-Bold.ttf"),
    "CabinetGrotesk-Extrabold": require("../assets/fonts/CabinetGrotesk-Extrabold.ttf"),
    "CabinetGrotesk-Black": require("../assets/fonts/CabinetGrotesk-Black.ttf"),
    "CabinetGrotesk-Variable": require("../assets/fonts/CabinetGrotesk-Variable.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
