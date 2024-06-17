import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import GlobalProvider from "../context/GlobalProvider";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "CabinetGrotesk-Thin": require("../assets/fonts/CabinetGrotesk-Thin.otf"),
    "CabinetGrotesk-Extralight": require("../assets/fonts/CabinetGrotesk-Extralight.otf"),
    "CabinetGrotesk-Light": require("../assets/fonts/CabinetGrotesk-Light.otf"),
    "CabinetGrotesk-Regular": require("../assets/fonts/CabinetGrotesk-Regular.otf"),
    "CabinetGrotesk-Medium": require("../assets/fonts/CabinetGrotesk-Medium.otf"),
    "CabinetGrotesk-Bold": require("../assets/fonts/CabinetGrotesk-Bold.otf"),
    "CabinetGrotesk-Extrabold": require("../assets/fonts/CabinetGrotesk-Extrabold.otf"),
    "CabinetGrotesk-Black": require("../assets/fonts/CabinetGrotesk-Black.otf"),
    // "CabinetGrotesk-Variable": require("../assets/fonts/CabinetGrotesk-Variable.otf"),
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
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
