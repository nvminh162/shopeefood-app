import { Link } from "expo-router";
import { Text, View } from "react-native";

const HomeTab = () => {
  return (
    <View>
      <Text>HomeTab</Text>
      <Link
        style={{ padding: 10, backgroundColor: "red", marginTop: 5 }}
        href={"/product"}
      >
        Go to product
      </Link>
      <Link
        style={{ padding: 10, backgroundColor: "red", marginTop: 5 }}
        href={"/login"}
      >
        Go to login
      </Link>
    </View>
  );
};

export default HomeTab;
