import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import banner1 from "@/assets/banner/banner1.jpg";
import banner2 from "@/assets/banner/banner2.jpg";
import banner3 from "@/assets/banner/banner3.jpg";
import { APP_COLOR } from "@/utils/constants";

const BannerHome = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const data = [
    { id: 1, source: banner1 },
    { id: 2, source: banner2 },
    { id: 3, source: banner3 },
  ];
  const width = Dimensions.get("window").width;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width}
        height={width / 4} //customize height
        data={data}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <Image
            style={{
              width: width,
              height: width / 3.7,
              resizeMode: "cover",
            }}
            source={item.source}
          />
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{
          backgroundColor: APP_COLOR.GREY,
          borderRadius: 50,
          width: 6,
          height: 6,
        }}
        activeDotStyle={{
          backgroundColor: APP_COLOR.ORANGE,
        }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default BannerHome;
