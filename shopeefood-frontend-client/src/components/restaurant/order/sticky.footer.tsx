import { currencyFormatter } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const StickyFooter = () => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        zIndex: 11,
        position: "absolute",
        bottom: 30,
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
          borderTopColor: APP_COLOR.ORANGE,
        }}
      >
        <View style={{ padding: 10 }}>
          <View
            style={{
              position: "absolute",
              left: 40,
              top: 5,
              width: 20,
              height: 20,
              borderRadius: 20 / 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: APP_COLOR.ORANGE,
            }}
          >
            <Text style={{ color: "white", fontSize: 10 }}>9+</Text>
          </View>
          <Pressable onPress={() => alert("Cart")}>
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
            {currencyFormatter(125000)}
          </Text>
        </View>
      </View>
      {/* Right */}
      <View
        style={{
          width: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: APP_COLOR.ORANGE,
        }}
      >
        <Text style={{ color: "white" }} onPress={() => alert("Delivery")}>
          Delivery
        </Text>
      </View>
    </View>
  );
};

export default StickyFooter;
