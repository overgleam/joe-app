import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { data: posts, refetch, isLoading } = useAppwrite(getAllPosts);
  const { user } = useGlobalContext();

  const {
    data: latestPosts,
    // refetch: latestPostsRefetch,
    // isLoading: latestPostsLoading,
  } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={posts}
        key={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pbold text-base text-primary">
                  Welcome back to Alforque
                </Text>
                <Text className="text-2xl font-pblack">{user?.username}</Text>
              </View>
              <View className="mt.1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text
                className="text-primary text-lg font-pregular"
                style={{ fontFamily: "" }}
              >
                Latest Videos
              </Text>
            </View>

            <Trending post={latestPosts} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
