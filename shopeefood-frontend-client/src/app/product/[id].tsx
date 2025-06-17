import SkeletonProductId from "@/components/loading/skeleton.product.[id]";
import RMain from "@/components/restaurant/main";
import { useCurrentApp } from "@/context/app.context";
import { getRestaurantByIdAPI } from "@/utils/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

const ProductPage = () => {
  const { id } = useLocalSearchParams();
  const { setRestaurant } = useCurrentApp();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setIsLoading(true);
      const res = await getRestaurantByIdAPI(id as string);
      if (res.data) {
        setRestaurant(res.data);
      }
      setIsLoading(false);
    };

    fetchRestaurant();
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <SkeletonProductId /> : <RMain />}
    </View>
  );
};

export default ProductPage;
