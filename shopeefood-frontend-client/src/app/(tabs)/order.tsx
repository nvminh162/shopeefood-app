import { currencyFormatter, getOrderHistoryAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderTab = () => {
  const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const res = await getOrderHistoryAPI();
      if (res.data) setOrderHistory(res.data);
    };
    fetchOrderHistory();
  }, [orderHistory]);

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
          <Text style={{ color: APP_COLOR.ORANGE }}>History Order</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {orderHistory.map((item, index) => {
            return (
              <View key={index}>
                <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
                  <Image style={{ height: 100, width: 100 }} source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.restaurant.image}` }}/>
                  <View style={{ gap: 10 }}>
                    <Text>{item.restaurant.name}</Text>
                    <Text>{item.restaurant.address}</Text>
                    <Text>{currencyFormatter(item.totalPrice)} ({item.totalQuantity} món)</Text>
                    <Text>Status: {item.status}</Text>
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

export default OrderTab;
