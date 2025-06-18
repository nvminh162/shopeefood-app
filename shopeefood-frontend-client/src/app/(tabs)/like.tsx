import { getLikeRestaurantAPI, getOrderHistoryAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LikeTab = () => {
  const [likeRestaurant, setLikeRestaurant] = useState<IRestaurant[]>([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const res = await getLikeRestaurantAPI();
      if (res.data) setLikeRestaurant(res.data);
    };
    fetchOrderHistory();
  }, [likeRestaurant]);

  console.log(likeRestaurant);
  

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
        <ScrollView style={{ flex: 1 }}>
          {likeRestaurant.map((item, index) => {
            return (
              <View key={index}>
                <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
                  <Image style={{ height: 100, width: 100 }} source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.image}` }}/>
                  <View style={{ gap: 10 }}>
                    <Text>{item.name}</Text>
                    <Text>{item.phone}</Text>
                    <Text>{item.address}</Text>
                  </View>
                </View>
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
