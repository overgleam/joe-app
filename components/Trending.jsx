import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ post }) => {
  return (
    <View>
      <FlatList
        data={post}
        key={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white-100">{item.a}</Text>
        )}
        horizontal
      />
    </View>
  );
};

export default Trending;
