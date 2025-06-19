import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import popupSale from "@/assets/popup/2.png";

const PopupSale = () => {
  return (
      <Animated.View
        entering={FadeIn}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Animated.View
          entering={SlideInDown}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: 26,
              width: 26,
              borderRadius: 26 / 2,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              right: -150,
            }}
          >
            <AntDesign
              onPress={() => router.back()}
              name="close"
              size={22}
              color="grey"
            />
          </View>
          <Image
            source={popupSale}
            style={{
              height: 300,
              width: 285,
            }}
          />
        </Animated.View>
      </Animated.View>
  );
};

export default PopupSale;
