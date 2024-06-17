import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "../../components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import * as ImagePicker from "expo-image-picker";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    video: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      exif: false,
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };
  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert("Please fill in all the fields");
      return;
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Successful", "Video uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Idiot", error.message);
    } finally {
      setForm({
        title: "",
        thumbnail: null,
        video: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        className="px-4 my-6"
        contentContainerStyle={{ paddingBottom: 75 }}
      >
        <Text className="text-2xl text-primary font-bold">Upload Video</Text>
        <FormField
          title={"Video Title"}
          value={form.title}
          placeholder={"Enter the title of your video"}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={"mt-10"}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-primary font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
                shouldPlay
              />
            ) : (
              <View className="w-full h-40 px-4 bg-white-200 border-2 border-black rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-400 justify-center items-center">
                  <Image source={icons.upload} className="w-1/2 h-1/2" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-primary font-pmedium">
            Upload Thumbnail
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-16 px-4 bg-white-200 rounded-2xl justify-center items-center border-2 border-black flex-row space-x-2">
                <Image source={icons.upload} className="w-5 h-5" />
                <Text className="text-sm text-primary font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Description"
          value={form.prompt}
          placeholder={"Enter the description of your video"}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          multiline={true}
          otherStyles={"mt-7"}
        />

        <CustomButton
          title="Upload"
          handlePress={submit}
          isLoading={uploading}
          containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
