import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setisLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Idiot!", "Please fill all fields.");
    }

    setisSubmitting(true);

    try {
      await signIn(form.email, form.password);
      // const result = await getCurrentUser();
      // setUser(result);
      // setisLoggedIn(true);

      Alert.alert("Login", "Successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Image
              source={images.logo}
              className="w-[115px] h-[35px]"
              resizeMode="contain"
            />
            <Text className="text-2xl text-primary font-pbold mt-10">
              Login to Alforque
            </Text>
            <FormField
              title="Email"
              value={form.email}
              placeholder={"Enter email"}
              handleChangeText={(e) => {
                setForm({ ...form, email: e });
              }}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              placeholder={"Enter password"}
              value={form.password}
              handleChangeText={(e) => {
                setForm({ ...form, password: e });
              }}
              otherStyles="mt-7"
              borderStyle="border-cyan-500"
            />
            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-6"
              animatedContainerStyles="bg-secondary-100"
              textStyles=""
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-200 font-pregular">
                Dont have an account?
              </Text>
              <Link
                href="sign-up"
                className="text-lg text-fuchsia-500 font-pextrabold"
              >
                Sign Up!
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
