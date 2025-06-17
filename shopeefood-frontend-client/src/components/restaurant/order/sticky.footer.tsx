import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface IProps {
  restaurant: IRestaurant | null;
}

const StickyFooter = (props: IProps) => {
  const { cart } = useCurrentApp();
  const { restaurant } = props;

  const getSum = () => {
    if (restaurant && cart[restaurant._id]) {
      return cart[restaurant._id].sum;
    }
    return 0;
  };

  return (
    <>
      {getSum() === 0 ? (
        <></>
      ) : (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            zIndex: 11,
            position: "absolute",
            bottom: 80,
            flexDirection: "row",
          }}
        >
          {/* Left */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              borderTopWidth: 1,
              borderTopColor: APP_COLOR.GREY,
            }}
          >
            <View style={{ paddingVertical: 10, paddingHorizontal: 30 }}>
              <View
                style={{
                  position: "absolute",
                  left: 60,
                  top: 5,
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: APP_COLOR.ORANGE,
                }}
              >
                <Text style={{ color: "white", fontSize: 10 }}>
                  {restaurant &&
                    cart &&
                    cart[restaurant?._id] &&
                    cart[restaurant?._id]["quantity"] && (
                      <Text>{cart[restaurant?._id]["quantity"]}</Text>
                    )}
                </Text>
              </View>
              <Pressable onPress={() => alert("@nvminh162 said: This feature is under development")}>
                <FontAwesome5
                  name="shopping-basket"
                  size={30}
                  color={APP_COLOR.ORANGE}
                />
              </Pressable>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Text
                style={{
                  color: APP_COLOR.ORANGE,
                  fontSize: 18,
                }}
              >
                {currencyFormatter(getSum())}
              </Text>
            </View>
          </View>
          {/* Right */}
          <View
            style={{
              paddingHorizontal: 30,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: APP_COLOR.ORANGE,
            }}
          >
            <Text style={{ color: "white" }} onPress={() => router.navigate("/product/place.order")}>
              Check out
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default StickyFooter;
