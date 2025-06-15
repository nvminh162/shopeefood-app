import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import demoImg from "@/assets/product/demo.jpg";
import { APP_COLOR } from "@/utils/constants";
import AntDesign from '@expo/vector-icons/AntDesign';

interface IProps {
  name: string;
  description: string;
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
  const { name, description } = props;
  const data = [
    { key: 1, image: demoImg, name: "Cửa hàng 1" },
    { key: 2, image: demoImg, name: "Cửa hàng 2" },
    { key: 3, image: demoImg, name: "Cửa hàng 3" },
    { key: 4, image: demoImg, name: "Cửa hàng 4" },
    { key: 5, image: demoImg, name: "Cửa hàng 5" },
  ];

  return (
    <>
      <View style={{ height: 10, backgroundColor: "#e9e9e9" }} />
      <View style={styles.container}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text
            style={{ color: APP_COLOR.ORANGE, fontSize: 16, fontWeight: "600" }}
          >
            {name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={{ color: "#5a5a5a" }}>See all</Text>
            <AntDesign style={{ color: "#5a5a5a" }} name="right" size={15} color="black" />
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: "#5a5a5a" }}>{description}</Text>
        </View>
        <FlatList
          data={data}
          horizontal
          contentContainerStyle={{ gap: 5 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={{ backgroundColor: "#efefef" }}>
                <Image
                  style={{ height: 130, width: 130 }}
                  source={item.image}
                />
                <View style={{ padding: 5 }}>
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  <View style={styles.sale}>
                    <Text style={{ color: APP_COLOR.ORANGE }}>Flash Sale</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default CollectionHome;
