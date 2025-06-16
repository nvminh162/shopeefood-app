import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  Pressable,
} from "react-native";
import { APP_COLOR } from "@/utils/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { getTopRestaurantAPI } from "@/utils/api";
import { router } from "expo-router";
import SkeletonCollectionHome from "../loading/skeleton.collection.home";

interface IProps {
  name: string;
  description: string;
  refAPI: string;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sale: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: APP_COLOR.ORANGE,
    padding: 3,
    borderRadius: 3,
    alignSelf: "flex-start",
  },
});

const CollectionHome = (props: IProps) => {
  const { name, description, refAPI } = props;
  const [restaurant, setRestaurant] = useState<ITopRestaurant[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getTopRestaurantAPI(refAPI);
      if (res.data) {
        setRestaurant(res.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [refAPI]);

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;
  const baseImage = `${backend}/images/restaurant`;

  return (
    <>
      <View style={{ height: 10, backgroundColor: "#e9e9e9" }} />
      {isLoading ? (
        <SkeletonCollectionHome />
      ) : (
        <View style={styles.container}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={{
                color: APP_COLOR.ORANGE,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {name}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ color: "#5a5a5a" }}>See all</Text>
              <AntDesign
                style={{ color: "#5a5a5a" }}
                name="right"
                size={15}
                color="black"
              />
            </View>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ color: "#5a5a5a" }}>{description}</Text>
          </View>
          <FlatList
            data={restaurant}
            horizontal
            contentContainerStyle={{ gap: 5 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() =>
                    router.navigate({
                      pathname: "/product/[id]",
                      params: { id: item._id },
                    })
                  }
                >
                  <View style={{ backgroundColor: "#efefef" }}>
                    <Image
                      style={{ height: 130, width: 130 }}
                      source={{ uri: `${baseImage}/${item.image}` }}
                    />
                    <View style={{ padding: 5 }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ fontWeight: "bold", maxWidth: 130 }}
                      >
                        {item.name}
                      </Text>
                      <View style={styles.sale}>
                        <Text style={{ color: APP_COLOR.ORANGE }}>
                          Flash Sale
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      )}
    </>
  );
};

export default CollectionHome;
