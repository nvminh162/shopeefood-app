import React from "react";
import { Text, View, StyleSheet, TextInput, Animated } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { APP_COLOR } from "@/utils/constants";

// Constants for header animation
const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

interface HeaderHomeProps {
  scrollY: Animated.Value;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const HeaderHome = ({
  scrollY,
  searchValue,
  setSearchValue,
}: HeaderHomeProps) => {
  // Calculate animation values
  const locationOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const locationHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [40, 0],
    extrapolate: "clamp",
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.View
        style={[
          styles.locationContainer,
          { height: locationHeight, opacity: locationOpacity },
        ]}
      >
        <View style={styles.locationContent}>
          <MaterialIcons name="location-on" size={18} color="#fff" />
          <Text
            style={styles.locationText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            137/2 Đ. Trần Bá Giao, Phường 5, Gò Vấp, Hồ Chí Minh
          </Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="#fff" />
        </View>
      </Animated.View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder="nvminh162 got the bang no cap"
            readOnly
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: APP_COLOR.ORANGE,
    zIndex: 1000,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: "hidden",
  },
  locationContainer: {
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  locationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    flex: 1,
    color: "white",
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
  },
  searchContainer: {
    padding: 12,
    paddingTop: 8,
    paddingBottom: 15,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
    color: APP_COLOR.ORANGE,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: APP_COLOR.ORANGE,
    fontWeight: "ultralight",
  },
});

export default HeaderHome;
