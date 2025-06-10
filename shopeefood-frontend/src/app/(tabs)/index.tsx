import { useState, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import HeaderHome from "@/components/home/header.home";
import TopList from "@/components/home/top.list";
import BannerHome from "@/components/home/banner.home";

const HEADER_MAX_HEIGHT = 100; //distance from HeaderHome to Body

const HomeTab = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchValue, setSearchValue] = useState("Rau Má Mix Mùa 1 Tầng 1");

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
        <TopList />
        <TopList />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT + 10,
    backgroundColor: "#f5f5f5",
  },
});

export default HomeTab;
