const { height: sHeight, width: sWidth } = Dimensions.get("window");
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

const SkeletonCollectionHome = () => {
  return (
    <ContentLoader
      speed={2}
      width={sWidth}
      height={230}
      // viewBox="0 0 700 150"
      backgroundColor="#f3f3f3"
      // foregroundColor="#ecebeb"
      foregroundColor="#ccc"
      style={{ width: "100%" }}
    >
      <Rect x="10" y="10" rx="5" ry="5" width={150} height="200" />
      <Rect x="170" y="10" rx="5" ry="5" width={150} height="200" />
      <Rect x="330" y="10" rx="5" ry="5" width={150} height="200" />
    </ContentLoader>
  );
};

export default SkeletonCollectionHome;
