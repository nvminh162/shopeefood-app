import { useState, useRef } from "react";
import { View, StyleSheet, Animated, StatusBar } from "react-native";
import HeaderHome from "@/components/home/header.home";
import TopList from "@/components/home/top.list";
import BannerHome from "@/components/home/banner.home";
import CollectionHome from "@/components/home/collection.home";
import { APP_COLOR } from "@/utils/constants";

const HEADER_MAX_HEIGHT = 100; //distance from HeaderHome to Body

const data = [
  { key: 1, name: "Top Quán Rating 5* tuần này", ref: "" },
  { key: 2, name: "Quán Mới Lên Sàn", ref: "" },
  { key: 3, name: "Ăn Thỏa Thích, Freeship 0Đ", ref: "" },
];

const HomeTab = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchValue, setSearchValue] = useState(
    "@nvminh162 got the bang no cap"
  );

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <HeaderHome
        scrollY={scrollY}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {/* Home Body */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <BannerHome />
        <TopList />
        {data.map((item) => (
          <CollectionHome key={item.key} name={item.name} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT + 10,
  },
});

export default HomeTab;
