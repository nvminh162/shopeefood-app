import { Image, Pressable, Text, TextInput, View } from "react-native";
import debounce from "debounce";
import { getRestaurantsByNameAPI, getURLBaseBackend } from "@/utils/api";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { APP_COLOR } from "@/utils/constants";
import DefaultResult from "@/components/search/default.result";

const SearchPage = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = debounce(async (text: string) => {
    setSearchTerm(text);
    if (!text) return;
    const res = await getRestaurantsByNameAPI(text);
    if (res.data) setRestaurants(res.data.results);
  }, 500);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          padding: 10,
        }}
      >
        <MaterialIcons
          onPress={() => router.back()}
          name="arrow-back"
          size={24}
          color={APP_COLOR.ORANGE}
        />
        <TextInput
          placeholder="Search restaurant"
          onChangeText={(text: string) => handleSearch(text)}
          autoFocus
          style={{
            flex: 1,
            backgroundColor: "#eee",
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderRadius: 5,
          }}
        />
      </View>
      <View style={{ backgroundColor: "#eee", flex: 1 }}>
        {searchTerm.length === 0 ? (
          <DefaultResult />
        ) : (
          <View style={{ backgroundColor: "white", gap: 10 }}>
            {restaurants?.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    router.navigate({
                      pathname: "/product/[id]",
                      params: { id: item._id },
                    })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    gap: 10,
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                  }}
                >
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.image}` }}
                  />
                  <Text>{item.name}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;
