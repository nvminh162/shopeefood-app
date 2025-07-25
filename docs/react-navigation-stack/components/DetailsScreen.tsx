import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

function DetailsScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  // console.log(route);
  /* 
  {
    "key": "details-4vc_Qfnys9AQsI37eKb3T", 
    "name": "details", 
    "params":
      {
        "name": "eric", 
        "userId": 2
      }, 
    "path": undefined
  }
  */
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
