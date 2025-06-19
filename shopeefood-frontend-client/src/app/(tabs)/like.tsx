import { getLikeRestaurantAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LikeTab = () => {
  const [likeRestaurant, setLikeRestaurant] = useState<IRestaurant[]>([]);
  //refresh
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchRestaurants = async () => {
    const res = await getLikeRestaurantAPI();
    if (res.data) setLikeRestaurant(res.data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRestaurants();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
            paddingBottom: 5,
          }}
        >
          <Text style={{ color: APP_COLOR.ORANGE }}>Like restaurant</Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {likeRestaurant.map((item, index) => {
            return (
              <View key={index}>
                <Pressable
                  onPress={() =>
                    router.navigate({
                      pathname: "/product/[id]",
                      params: { id: item._id },
                    })
                  }
                >
                  <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
                    <Image
                      style={{ height: 100, width: 100 }}
                      source={{
                        uri: `${getURLBaseBackend()}/images/restaurant/${
                          item.image
                        }`,
                      }}
                    />
                    <View style={{ gap: 10 }}>
                      <Text>{item.name}</Text>
                      <Text>{item.phone}</Text>
                      <Text>{item.address}</Text>
                    </View>
                  </View>
                </Pressable>
                <View style={{ height: 10, backgroundColor: "#e9e9e9" }} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LikeTab;
