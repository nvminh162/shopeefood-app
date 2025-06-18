import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

interface IUpdateItem {
  image: string;
  title: string;
  option: string;
  price: number;
  quantity: number;
}

const UpdateModal = () => {
  const { restaurant, cart, setCart } = useCurrentApp();
  const { menuItemId } = useLocalSearchParams();

  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
  const [updateItems, setUpdateItems] = useState<IUpdateItem[]>([]);
  useEffect(() => {
    if (restaurant && menuItemId) {
      for (let i = 0; i < restaurant.menu.length; i++) {
        const menu = restaurant.menu[i];
        let check = false;
        for (let j = 0; j < menu.menuItem.length; j++) {
          if (menu.menuItem[j]._id === menuItemId) {
            check = true;
            setMenuItem(menu.menuItem[j]);
            break;
          }
        }
        if (check) break;
      }
    }
  }, [restaurant, menuItemId]);

  useEffect(() => {
    if (menuItem && restaurant) {
      const currentItems = cart[restaurant._id].items[menuItem._id];
      if (currentItems.extra) {
        const result = [];
        for (const [key, value] of Object.entries(currentItems.extra)) {
          const option = menuItem.options?.find(
            (item) => `${item.title}-${item.description}` === key
          );

          const addPrice = option?.additionalPrice ?? 0;

          result.push({
            image: menuItem.image,
            title: menuItem.title,
            option: key,
            price: menuItem.basePrice + addPrice,
            quantity: value,
          });
        }
        setUpdateItems(result);
      }
    }
  }, [menuItem]);

  const handlePressItem = (item: IUpdateItem, action: "MINUS" | "PLUS") => {
    let foundItem = updateItems.find((x) => x.option === item.option);
    const foundIndex = updateItems.findIndex((x) => x.option === item.option);
    let shouldCloseModal = false;

    if (foundItem) {
      const total = action === "MINUS" ? -1 : 1;
      foundItem.quantity = foundItem.quantity + total;

      if (foundItem.quantity === 0) {
        const temp = updateItems.filter((x) => x.option !== item.option);
        setUpdateItems(temp);
        if (temp.length === 0) shouldCloseModal = true;
      } else {
        const temp = [...updateItems];
        temp[foundIndex] = foundItem;
        setUpdateItems(temp);
      }

      //update cart
      updateCart(total, foundItem.option, foundItem.price);
      if (shouldCloseModal) router.back();
    }
  };

  const updateCart = (total: number, keyOption: string, price: number) => {
    if (restaurant?._id && menuItem) {
      const item = menuItem;

      //xử lý sản phẩm
      cart[restaurant._id].sum = cart[restaurant._id].sum + total * price;
      cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;

      const currentQuantity =
        cart[restaurant._id].items[item._id].quantity + total;

      const i = cart[restaurant._id].items[item._id];

      let currentExtraQuantity = 0;
      if (i.extra && i.extra?.[keyOption] !== null) {
        currentExtraQuantity = i.extra[keyOption] + total;
      }

      cart[restaurant._id].items[item._id] = {
        data: menuItem,
        quantity: currentQuantity,
        extra: {
          ...cart[restaurant._id].items[item._id].extra,
          [keyOption]: currentExtraQuantity,
        },
      };

      if (currentExtraQuantity <= 0) {
        delete cart[restaurant._id].items[item._id].extra?.[keyOption];
      }

      //Chỉ xoá giỏ hàng khi số lượng sản phẩm options = 1
      if (currentExtraQuantity <= 0 && updateItems.length === 1) {
        delete cart[restaurant._id].items[item._id];
      }

      setCart((prev: any) => ({ ...prev, ...cart }));
    }
  };

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#00000040",
      }}
    >
      <Pressable
        onPress={() => router.back()}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        entering={SlideInDown}
        style={{
          height: "60%",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            flexDirection: "row",
            gap: 10,
            padding: 10,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Edit quantity
            </Text>
          </View>
          <AntDesign
            onPress={() => router.back()}
            name="close"
            size={24}
            color="grey"
          />
        </View>
        <ScrollView
          style={{
            flex: 1,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}
        >
          {updateItems.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "white",
                  gap: 15,
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderBottomColor: "#eee",
                  borderBottomWidth: 1,
                }}
              >
                <View>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{
                      uri: `${getURLBaseBackend()}/images/menu-item/${
                        menuItem?.image
                      }`,
                    }}
                  />
                </View>
                <View style={{ flex: 1, gap: 10 }}>
                  <View>
                    <Text>{item?.title}</Text>
                  </View>
                  <View>
                    <Text>{item?.option}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ color: APP_COLOR.ORANGE }}>
                      {currencyFormatter(item?.price)}
                    </Text>
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 3,
                      }}
                    >
                      <Pressable
                        style={({ pressed }) => ({
                          opacity: pressed === true ? 0.5 : 1,
                          alignSelf: "flex-start", //fit-content
                        })}
                        onPress={() => handlePressItem(item, "MINUS")}
                      >
                        <AntDesign
                          name="minussquareo"
                          size={24}
                          color={APP_COLOR.ORANGE}
                        />
                      </Pressable>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ minWidth: 20, textAlign: "center" }}>
                          {item.quantity}
                        </Text>
                      </View>
                      <Pressable
                        style={({ pressed }) => ({
                          opacity: pressed === true ? 0.5 : 1,
                          alignSelf: "flex-start", //fit-content
                        })}
                        onPress={() => handlePressItem(item, "PLUS")}
                      >
                        <AntDesign
                          name="plussquare"
                          size={24}
                          color={APP_COLOR.ORANGE}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

export default UpdateModal;
