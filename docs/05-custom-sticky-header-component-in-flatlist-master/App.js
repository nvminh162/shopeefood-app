import CustomFlatList from "./components/CustomFlatList/CustomFlatList";
import { FlatList, SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";

const data = Array(10).fill(1);

const data1 = Array(20).fill(1);

export default function App() {

  const MyComponent = () => {
    // https://stackoverflow.com/questions/45939823/react-native-horizontal-flatlist-with-multiple-rows
    return (
      <View style={styles.topList} >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
        >
          <FlatList
            contentContainerStyle={{ alignSelf: 'flex-start' }}
            numColumns={Math.ceil(data1.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data1}
            renderItem={({ item, index }) => {
              return (
                <View style={{ padding: 10, margin: 5, borderWidth: 1, borderColor: "#ccc", width: 50, height: 50, alignSelf: "flex-start" }}>
                  <Text>{index + 1}</Text>
                </View>
              )
            }}
          />
        </ScrollView>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={() => <View style={styles.item} />}
        HeaderComponent={<View style={styles.header} />}
        StickyElementComponent={<View style={styles.sticky} />}
        // TopListElementComponent={<View style={styles.topList} />}
        TopListElementComponent={<MyComponent />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    padding: 8
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
  item: {
    borderColor: "green",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
  list: {
    overflow: "hidden"
  },
  sticky: {
    backgroundColor: "#2555FF50",
    borderColor: "blue",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
  topList: {
    borderColor: "orange",
    borderWidth: 5,
    minHeight: 100,
    marginBottom: 6,
    width: "100%"
  }
});
