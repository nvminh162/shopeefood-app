import { FlatList, Image, ScrollView, Text, View } from "react-native";

const data = [
  {
    id: 1,
    name: "Hot Deal",
    source: require("@/assets/icons/flash-deals.png"),
  },
  {
    id: 2,
    name: "Quán Ngon",
    source: require("@/assets/icons/nice-shop.png"),
  },
  { id: 3, name: "Tích Điểm", source: require("@/assets/icons/points.png") },
  { id: 4, name: "Ngọt Xỉu", source: require("@/assets/icons/rice.png") },
  {
    id: 5,
    name: "Quán Tiền Bối",
    source: require("@/assets/icons/noodles.png"),
  },
  {
    id: 6,
    name: "Bún, Mì, Phở",
    source: require("@/assets/icons/bun-pho.png"),
  },
  { id: 7, name: "BBQ", source: require("@/assets/icons/bbq.png") },
  { id: 8, name: "Fast Food", source: require("@/assets/icons/fastfood.png") },
  { id: 9, name: "Pizza", source: require("@/assets/icons/Pizza.png") },
  { id: 10, name: "Burger", source: require("@/assets/icons/burger.png") },
  {
    id: 11,
    name: "Sống Khỏe",
    source: require("@/assets/icons/egg-cucmber.png"),
  },
  { id: 12, name: "Giảm 50k", source: require("@/assets/icons/moi-moi.png") },
  {
    id: 13,
    name: "99k Off",
    source: require("@/assets/icons/fried-chicken.png"),
  },
  {
    id: 14,
    name: "No Bụng",
    source: require("@/assets/icons/korean-food.png"),
  },
  { id: 15, name: "Freeship", source: require("@/assets/icons/Steak.png") },
  { id: 16, name: "Deal 0Đ", source: require("@/assets/icons/tomato.png") },
  { id: 17, name: "Món 1Đ", source: require("@/assets/icons/elipse.png") },
  { id: 18, name: "Ăn chiều", source: require("@/assets/icons/chowmein.png") },
  { id: 19, name: "Combo 199k", source: require("@/assets/icons/Notif.png") },
  { id: 20, name: "Milk Tea", source: require("@/assets/icons/salad.png") },
];

const TopList = () => {
  return (
    <View
      style={{
        minHeight: 100,
        marginBottom: 6,
        width: "100%",
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
        style={{marginVertical: 15}}
      >
        <FlatList
          contentContainerStyle={{ alignSelf: "flex-start" }}
          numColumns={Math.ceil(data.length / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  padding: 5,
                  width: 100,
                  alignItems: "center",
                }}
              >
                <Image
                  source={item.source}
                  style={{
                    height: 35,
                    width: 35,
                  }}
                />
                <Text style={{ alignItems: "center" }}>{item.name}</Text>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default TopList;
