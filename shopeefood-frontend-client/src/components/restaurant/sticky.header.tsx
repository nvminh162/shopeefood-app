import { APP_COLOR } from "@/utils/constants";
import { router } from "expo-router";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCurrentApp } from "@/context/app.context";
import Toast from "react-native-root-toast";
import { toggleLikeAPI } from "@/utils/api";
import { useEffect, useState } from "react";

const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);
const { height: sHeight, width: sWidth } = Dimensions.get("window");

interface IProps {
  headerHeight: number;
  imageHeight: number;

  animatedBackgroundStyle: any;
  animatedArrowColorStyle: any;
  animatedStickyHeaderStyle: any;
  animatedHeartIconStyle: any;
}

const StickyHeader = (props: IProps) => {
  const insets = useSafeAreaInsets();
  const {
    headerHeight,
    imageHeight,
    animatedBackgroundStyle,
    animatedArrowColorStyle,
    animatedStickyHeaderStyle,
    animatedHeartIconStyle,
  } = props;

  const { restaurant } = useCurrentApp();

  const handleToggleLike = async (id: string, quantity: number) => {
    try {
      const res = await toggleLikeAPI(id, quantity);
      if (res.data) {
        Toast.show(
          quantity > 0
            ? "Added to favorites"
            : "Removed from favorites",
          {
            duration: Toast.durations.LONG,
            textColor: "white",
            backgroundColor: APP_COLOR.ORANGE,
            opacity: 1,
          }
        );
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;
        Toast.show(m, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });
      }
    } catch (err) {
      // console.error(err);
      Toast.show("Like action failed, please try again!", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.ORANGE,
        opacity: 1,
      });
    }
  };

  const [isLike, setIsLike] = useState<boolean>(restaurant?.isLike || false);

  useEffect(() => {
    setIsLike(restaurant?.isLike || false);
  }, [restaurant]);
  
  const toggleLike = () => {
    if (!restaurant?._id) return;
    const newLikeState = !isLike;
    setIsLike(newLikeState);
    handleToggleLike(restaurant._id, newLikeState ? 1 : -1);
  };

  // nút Back và like/dislike gộp vào component này, vì nó có zIndex cao nhất => có thể pressabled
  return (
    <>
      <View
        style={{
          zIndex: 11,
          paddingTop: insets.top + 10,
          paddingHorizontal: 10,
          flexDirection: "row",
          gap: 5,
          height: headerHeight,
          position: "absolute",
          width: sWidth,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed === true ? 0.5 : 1 },
            { alignSelf: "flex-start" },
          ]}
          onPress={() => router.back()}
        >
          <Animated.View
            style={[
              animatedBackgroundStyle,
              {
                height: 30,
                width: 30,
                borderRadius: 30 / 2,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <AnimatedMaterialIcons
              name="arrow-back"
              size={24}
              style={animatedArrowColorStyle}
            />
          </Animated.View>
        </Pressable>
        <Animated.View style={[{ flex: 1 }, animatedStickyHeaderStyle]}>
          <TextInput
            placeholder={"@nvminh162 got the bang no cap"}
            style={{
              borderWidth: 1,
              borderColor: APP_COLOR.GREY,
              width: "100%",
              borderRadius: 3,
              paddingHorizontal: 10,
            }}
          />
        </Animated.View>
      </View>
      {/* background */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            height: headerHeight,
            backgroundColor: "white",
          },
          animatedStickyHeaderStyle,
        ]}
      />

      {/* like/dislike a restaurant */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: imageHeight + 80,
            right: 10,
            zIndex: 9,
          },
          animatedHeartIconStyle,
        ]}
      >
        {isLike ? (
          <MaterialIcons
            onPress={toggleLike}
            name="favorite"
            size={20}
            color={APP_COLOR.ORANGE}
          />
        ) : (
          <MaterialIcons
            onPress={toggleLike}
            name="favorite-outline"
            size={20}
            color={APP_COLOR.GREY}
          />
        )}
      </Animated.View>
    </>
  );
};

export default StickyHeader;
