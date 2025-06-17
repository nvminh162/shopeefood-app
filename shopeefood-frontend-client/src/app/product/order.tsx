import { useCurrentApp } from "@/context/app.context";
import {
  currencyFormatter,
  getURLBaseBackend,
  placeOrderAPI,
} from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-root-toast";

interface IOrderItem {
  image: string;
  title: string;
  option: string;
  price: number;
  quantity: number;
}

const OrderPage = (props: IOrderItem) => {
  const { restaurant, cart, setCart } = useCurrentApp();
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
  useEffect(() => {
    if (
      cart &&
      restaurant &&
      restaurant._id &&
      cart[restaurant._id] &&
      cart[restaurant._id].items
    ) {
      const result = [];
      for (const [menuItemId, currentItems] of Object.entries(
        cart[restaurant._id].items
      )) {
        if (currentItems.extra) {
          for (const [key, value] of Object.entries(currentItems.extra)) {
            const option = currentItems.data.options?.find(
              (item) => `${item.title}-${item.description}` === key
            );

            const addPrice = option?.additionalPrice ?? 0;

            result.push({
              image: currentItems.data.image,
              title: currentItems.data.title,
              option: key,
              price: currentItems.data.basePrice + addPrice,
              quantity: value,
            });
          }
        } else {
          result.push({
            image: currentItems.data.image,
            title: currentItems.data.title,
            option: "",
            price: currentItems.data.basePrice,
            quantity: currentItems.quantity,
          });
        }

        setOrderItems(result);
      }
    }
  }, [restaurant]);

  const E_WALLET = "e-wallet";
  const CASH = "cash";
  const [paymentMethod, setPaymentMethod] = useState<string>(E_WALLET);
  const handlePlaceOrder = async () => {
    if (!restaurant || !cart || !cart[restaurant._id]) {
      Toast.show("Cart is empty or restaurant not selected", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.ORANGE,
        opacity: 1,
      });
      return;
    }

    const data = {
      restaurant: restaurant._id,
      totalPrice: cart[restaurant._id].sum,
      totalQuantity: cart[restaurant._id].quantity,
      detail: orderItems,
    };
    console.log(data);

    const res = await placeOrderAPI(data);

    if (res.data) {
      Toast.show("Ordered successfully!", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.ORANGE,
        opacity: 1,
      });
      //clear data in cart
      if (restaurant) {
        delete cart[restaurant._id];
        setCart((prev: any) => ({
          ...prev,
          ...cart,
        }));
      }
      //Navigate to home
      setTimeout(() => {
        router.replace("/");
      }, 500);
    } else {
      const m = Array.isArray(res.message) ? res.message[0] : res.message;
      Toast.show(m, {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.ORANGE,
        opacity: 1,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
          marginLeft: 10,
        }}
      >
        <MaterialIcons name="location-on" size={18} color={APP_COLOR.ORANGE} />
        <Text
          style={{
            flex: 1,
            color: "black",
            fontSize: 14,
            marginLeft: 5,
            marginRight: 5,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          <Text style={{ color: APP_COLOR.ORANGE }}>Giao đến:</Text>
          {` `}
          137/2 Đ.Trần Bá Giao, Phường 5, Gò Vấp, Hồ Chí Minh
        </Text>
        <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{restaurant?.name}</Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {orderItems?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  gap: 10,
                  flexDirection: "row",
                  borderBottomColor: "#eee",
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                }}
              >
                <Image
                  style={{ height: 50, width: 50 }}
                  source={{
                    uri: `${getURLBaseBackend()}/images/menu-item/${
                      item.image
                    }`,
                  }}
                />
                <View>
                  <Text style={{ fontWeight: "bold" }}>x{item.quantity}</Text>
                </View>
                <View style={{ gap: 10 }}>
                  <Text>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: APP_COLOR.GREY }}>
                    {item.option}
                  </Text>
                </View>
              </View>
              <Text style={{ fontStyle: "italic" }}>
                {currencyFormatter(item.price * item.quantity)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          gap: 20,
          marginBottom: 15,
          padding: 10,
          borderTopColor: "#ccc",
          borderTopWidth: 1,
        }}
      >
        {orderItems?.length > 0 && (
          <View style={{ gap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Số lượng:</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>
                  {(restaurant &&
                    cart?.[restaurant._id] &&
                    cart?.[restaurant._id].quantity) ||
                    0}
                  món
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Phí vận chuyển:</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{currencyFormatter(0)}</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Tổng tiền:</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>
                  {currencyFormatter(
                    (restaurant &&
                      cart?.[restaurant._id] &&
                      cart?.[restaurant._id].sum) ||
                      0
                  )}
                </Text>
              </View>
            </View>
          </View>
        )}
        {/* Payment method */}
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Pressable
            onPress={() => setPaymentMethod(E_WALLET)}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : 1,
              padding: 10,
              backgroundColor: "white",
              borderColor:
                paymentMethod === E_WALLET ? APP_COLOR.ORANGE : APP_COLOR.GREY,
              borderWidth: 1,
              borderRadius: 3,
              flex: 1,
            })}
          >
            <Text
              style={{
                color:
                  paymentMethod === E_WALLET
                    ? APP_COLOR.ORANGE
                    : APP_COLOR.GREY,
                textAlign: "center",
              }}
            >
              ShopeePay - VCB
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setPaymentMethod(CASH)}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : 1,
              padding: 10,
              backgroundColor: "white",
              borderColor:
                paymentMethod === CASH ? APP_COLOR.ORANGE : APP_COLOR.GREY,
              borderWidth: 1,
              borderRadius: 3,
              flex: 1,
            })}
          >
            <Text
              style={{
                color:
                  paymentMethod === CASH ? APP_COLOR.ORANGE : APP_COLOR.GREY,
                textAlign: "center",
              }}
            >
              Cash
            </Text>
          </Pressable>
        </View>
        {/* Order Now */}
        <View>
          <Pressable
            onPress={handlePlaceOrder}
            disabled={!restaurant || !cart || !cart[restaurant._id] || orderItems.length === 0}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : (!restaurant || !cart || !cart[restaurant._id] || orderItems.length === 0) ? 0.5 : 1,
              padding: 10,
              backgroundColor: (!restaurant || !cart || !cart[restaurant._id] || orderItems.length === 0) ? APP_COLOR.GREY : APP_COLOR.ORANGE,
              borderRadius: 3,
            })}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Place Order -{" "}
              {currencyFormatter(
                restaurant &&
                  cart?.[restaurant._id] &&
                  cart?.[restaurant._id].sum || 0
              )}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default OrderPage;
