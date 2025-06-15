import { useRef } from "react";
import {
  Button,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});

const SectionListBasic = () => {
  const sectionListRef = useRef<SectionList>(null);

  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"],
      index: 0,
      key: "menu-0",
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"],
      index: 1,
      key: "menu-1",
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"],
      index: 2,
      key: "menu-2",
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"],
      index: 3,
      key: "menu-3",
    },
    {
      title: "Desserts1",
      data: ["Cheese Cake", "Ice Cream"],
      index: 4,
      key: "menu-4",
    },
    {
      title: "Desserts2",
      data: ["Cheese Cake", "Ice Cream"],
      index: 5,
      key: "menu-5",
    },
    {
      title: "Desserts3",
      data: ["Cheese Cake", "Ice Cream"],
      index: 6,
      key: "menu-6",
    },
    {
      title: "Desserts4",
      data: ["Cheese Cake", "Ice Cream"],
      index: 7,
      key: "menu-7",
    },
    {
      title: "Desserts5",
      data: ["Cheese Cake", "Ice Cream"],
      index: 8,
      key: "menu-8",
    },
  ];

  const handleScrollToLocation = () => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex: 2,
      itemIndex: 0,
    });
  };

  const onViewableItemsChanged = ({ viewableItems, changed }: any) => {
    console.log("Visible items :", viewableItems[0]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 10, paddingBottom: 100 }}>
        <View>
          <Button title="Test Scroll" onPress={handleScrollToLocation} />
        </View>
        <SectionList
          // stickySectionHeadersEnabled
          ref={sectionListRef}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50, //means if 50% of the item is visible
            waitForInteraction: true,
          }}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.title}>
                {item} - {index + 1}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section: { title, index } }) => (
            <Text style={styles.header}>
              {title} - {index} - 0{" "}
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SectionListBasic;
