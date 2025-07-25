import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

function DetailsScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details User: {route?.params?.name}</Text>
      <View>
        <Button title="Back home" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

export default DetailsScreen;
