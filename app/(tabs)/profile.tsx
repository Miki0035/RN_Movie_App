import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const Profle = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex items-center justify-center flex-1 flex-col gap-5">
        <Image
          source={icons.person}
          className="size-10"
          tintColor={"#FFFFFF"}
        />
        <Text className="text-gray-500 text-base">Profile</Text>
      </View>
    </View>
  );
};

export default Profle;
