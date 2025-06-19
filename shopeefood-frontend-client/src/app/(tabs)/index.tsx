import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import HeaderHome from "@/components/home/header.home";
import TopList from "@/components/home/top.list";
import BannerHome from "@/components/home/banner.home";
import CollectionHome from "@/components/home/collection.home";
import { router } from "expo-router";

const HEADER_MAX_HEIGHT = 110; //distance from HeaderHome to Body

const data = [
  {
    key: 1,
    name: "Top Quán Rating 5 sao tuần này",
    description: "Gợi ý quán được tín đồ ẩm thực đánh giá 5 sao",
    refAPI: "top-rating",
  },
  {
    key: 2,
    name: "Quán Mới Lên Sàn",
    description: "Khám phá ngay loạt quán mới cực ngon",
    refAPI: "newcomer",
  },
  {
    key: 3,
    name: "Ăn Thỏa Thích, Freeship 0Đ",
    description: "Bánh ngọt, chân gà, bánh tráng trộn được Freeship",
    refAPI: "top-freeship",
  },
];

const HomeTab = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchValue, setSearchValue] = useState(
    "@nvminh162 got the bang no cap"
  );

  useEffect(() => {
    setTimeout(() => {
      router.navigate("/(auth)/popup.sale");
    }, 1000);
  }, []);

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
          <CollectionHome
            key={item.key}
            name={item.name}
            description={item.description}
            refAPI={item.refAPI}
          />
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
