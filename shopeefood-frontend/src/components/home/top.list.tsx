import { FlatList, ScrollView, Text, View } from "react-native";

const data = Array(20).fill(1);

const TopList = () => {
  return (
    <View
      style={{
        borderColor: "orange",
        borderWidth: 5,
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
      >
        <FlatList
          contentContainerStyle={{ alignSelf: "flex-start" }}
          numColumns={Math.ceil(data.length / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  width: 50,
                  height: 50,
                  alignSelf: "flex-start",
                }}
              >
                <Text>{index + 1}</Text>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default TopList