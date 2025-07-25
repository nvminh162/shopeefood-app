import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

const Home = () => {
  const navigation: any = useNavigation();

  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Go to Home Detail"
        onPress={() => navigation.navigate("HomeDetail")}
      />
    </View>
  );
};

export default Home;
