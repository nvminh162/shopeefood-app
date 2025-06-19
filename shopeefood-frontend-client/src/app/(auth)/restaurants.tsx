import {
  filterRestaurantAPI,
  getURLBaseBackend,
} from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const restaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const handleEndReached = async () => {
    if (!loading) {
      setLoading(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const fetchInitData = async () => {
    setLoading(true);
    const res = await filterRestaurantAPI(`current=1&pageSize=${pageSize}`);
    if (res.data) setRestaurants(res.data.results);
    setLoading(false);
  };
  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await filterRestaurantAPI(
        `current=${currentPage}&pageSize=${pageSize}`
      );
      if (res.data) setRestaurants([...restaurants, ...res.data.results]);
      setLoading(false);
    };
    if (currentPage > 1) fetchData();
  }, [currentPage]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={restaurants}
          onEndReachedThreshold={0.5}
          onEndReached={handleEndReached}
          keyExtractor={(item) => item._id}
          ListFooterComponent={() => 
            loading ? (
              <View style={{ padding: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: APP_COLOR.ORANGE }}>Loading...</Text>
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <Pressable
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
                style={{ height: 200, width: 200 }}
                source={{
                  uri: `${getURLBaseBackend()}/images/restaurant/${item.image}`,
                }}
              />
              <Text>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default restaurants;
