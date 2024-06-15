import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    confirmPassword: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("Idiot!", "Please fill all fields.");
    }
    if (form.password != form.confirmPassword)
      return Alert.alert("Are you idiot", "Password does not match!");

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full justify-center h-[85vh] px-4 my-6">
            <Image
              source={images.logo}
              className="w-[115px] h-[35px]"
              resizeMode="contain"
            />
            <Text className="text-2xl text-primary font-pbold mt-10">
              Signup to Alforque
            </Text>
            <FormField
              title="Username"
              placeholder="Enter username"
              value={form.username}
              handleChangeText={(e) => {
                setForm({ ...form, username: e });
              }}
              otherStyles="mt-7"
              keyboardType=""
              borderStyle="border-secondary-400"
            />
            <FormField
              title="Email"
              placeholder="Enter email"
              value={form.email}
              handleChangeText={(e) => {
                setForm({ ...form, email: e });
              }}
              otherStyles="mt-7"
              keyboardType="email-address"
              borderStyle="border-secondary-500"
            />
            <FormField
              title="Password"
              placeholder="Enter password"
              value={form.password}
              handleChangeText={(e) => {
                setForm({ ...form, password: e });
              }}
              otherStyles="mt-7"
              borderStyle="border-secondary-600"
            />
            <FormField
              title="Confirm Password"
              placeholder="Enter confirm password"
              value={form.confirmPassword}
              handleChangeText={(e) => {
                setForm({ ...form, confirmPassword: e });
              }}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-6"
              animatedContainerStyles="bg-secondary-100"
              textStyles=""
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-200 font-pregular">
                Already have an account?
              </Text>
              <Link
                href="sign-in"
                className="text-lg text-secondary-400q font-pmedium"
              >
                Sign In!
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
