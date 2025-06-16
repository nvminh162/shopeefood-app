import SkeletonProductId from "@/components/loading/skeleton.product.[id]";
import RMain from "@/components/restaurant/main";
import { getRestaurantByIdAPI } from "@/utils/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

const Product = () => {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
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
      {isLoading ? (
        <SkeletonProductId />
      ) : (
        <RMain restaurant={restaurant} />
      )}
    </View>
  );
};

export default Product;
