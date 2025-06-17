import ItemSingle from "@/components/restaurant/order/item.single";
import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

const CreateModalPage = () => {
  const { restaurant, cart, setCart } = useCurrentApp();
  const { menuItemId } = useLocalSearchParams();

  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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

  const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
    if (action === "MINUS" && quantity === 1) {
      router.back();
      return;
    }
    const total = action === "MINUS" ? -1 : 1;
    setQuantity((prev: number) => prev + total);
  };

  const handleAddCart = () => {
    if (restaurant?._id && menuItem) {
      const total = quantity;
      const item = menuItem!;

      const option = menuItem.options[selectedIndex];
      // Ex: Size-M, Size-L, ...
      const keyOption = `${option.title}-${option.description}`;

      //restaurant is not exist!
      if (!cart[restaurant?._id]) {
        cart[restaurant._id] = {
          sum: 0,
          quantity: 0,
          items: {},
        };
        cart[restaurant._id].sum = 0;
        cart[restaurant._id].quantity = 0;
        cart[restaurant._id].items = {};
      }

      cart[restaurant._id].sum =
        cart[restaurant._id].sum +
        total * (item.basePrice + option.additionalPrice);
      cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;

      // Check product is exist
      if (!cart[restaurant._id].items[item._id]) {
        cart[restaurant._id].items[item._id] = {
          data: menuItem,
          quantity: 0,
          extra: {
            [keyOption]: 0,
          },
        };
      }

      // check options is exist?
      if (cart[restaurant._id].items[item._id]) {
        const extra = cart[restaurant._id].items[item._id].extra;
        if (extra && !extra[keyOption]) {
          cart[restaurant._id].items[item._id] = {
            ...cart[restaurant._id].items[item._id],
            extra: {
              ...cart[restaurant._id].items[item._id].extra,
              [keyOption]: 0,
            },
          };
        }
      }

      const currentQuantity =
        cart[restaurant._id].items[item._id].quantity + total;
      const i = cart[restaurant._id].items[item._id];
      let currentExtraQuantity = 0;

      if (i.extra && i.extra?.[keyOption] !== null)
        currentExtraQuantity = i.extra[keyOption] + total;

      cart[restaurant._id].items[item._id] = {
        data: menuItem,
        quantity: currentQuantity,
        extra: {
          ...cart[restaurant._id].items[item._id].extra,
          [keyOption]: currentExtraQuantity,
        },
      };

      if (currentQuantity <= 0) {
        delete cart[restaurant._id].items[item._id];
      }

      setCart((prev: any) => ({ ...prev, ...cart }));
      router.back();
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
          height: "80%",
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
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Add new
            </Text>
          </View>
          <AntDesign
            onPress={() => router.back()}
            name="close"
            size={24}
            color="grey"
          />
        </View>

        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}
        >
          {menuItem && (
            <ItemSingle
              menuItem={menuItem}
              showMinus={true}
              quantity={quantity}
              handlePressItem={handlePressItem}
            />
          )}
        </View>

        <View
          style={{
            backgroundColor: "#eee",
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <Text>Choose 1 option</Text>
        </View>

        <ScrollView
          style={{
            flex: 1,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}
        >
          {menuItem?.options?.map((item, index) => {
            return (
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                  flexDirection: "row",
                }}
                key={index}
              >
                <View style={{ gap: 5, flex: 1 }}>
                  <Text>
                    {item.title} - {item.description}{" "}
                  </Text>
                  <Text style={{ color: APP_COLOR.ORANGE }}>
                    {currencyFormatter(item.additionalPrice)}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => setSelectedIndex(index)}
                    style={({ pressed }) => ({
                      opacity: pressed === true ? 0.5 : 1,
                      alignSelf: "flex-start",
                      padding: 2,
                      borderRadius: 2,
                      backgroundColor:
                        index === selectedIndex ? APP_COLOR.ORANGE : "white",
                      borderColor:
                        index === selectedIndex ? APP_COLOR.ORANGE : "grey",
                      borderWidth: 1,
                    })}
                  >
                    <Feather name="check" size={15} color="white" />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View
          style={{
            marginBottom: 20,
            marginTop: 10,
            marginHorizontal: 10,
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            onPress={handleAddCart}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : 1,
              padding: 10,
              backgroundColor: APP_COLOR.ORANGE,
              borderRadius: 3,
            })}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Add to cart
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default CreateModalPage;
