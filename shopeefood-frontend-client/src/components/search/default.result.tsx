import { FlatList, Image, Text, View } from "react-native";

const data = [
  {
    key: 1,
    name: "Quán Tiện Bối",
    source: require("@/assets/icons/Notif.png"),
  },
  { key: 2, name: "Bún, Mì, Phở", source: require("@/assets/icons/Pizza.png") },
  { key: 3, name: "Fast Food", source: require("@/assets/icons/Steak.png") },
  { key: 4, name: "Pizza", source: require("@/assets/icons/Sub-sandiwch.png") },
  { key: 5, name: "Burger", source: require("@/assets/icons/bbq.png") },
  { key: 6, name: "Sống Khỏe", source: require("@/assets/icons/bun-pho.png") },
  { key: 7, name: "Giảm 50K", source: require("@/assets/icons/burger.png") },
  { key: 8, name: "Milk Tea", source: require("@/assets/icons/chowmein.png") },
];

const DefaultResult = () => {
  return (
    <View style={{ backgroundColor: "white", padding: 10, gap: 10 }}>
      <Text>Popular</Text>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              flex: 1,
              borderColor: "#eee",
              borderTopWidth: index === 0 || index === 1 ? 1 : 0,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: index % 2 === 1 ? 1 : 0,
            }}
          >
            <Text>{item.name}</Text>
            <Image source={item.source} style={{ height: 40, width: 40 }} />
          </View>
        )}
      />
    </View>
  );
};

export default DefaultResult;
