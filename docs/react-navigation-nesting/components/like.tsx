import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

const Like = () => {
  const navigation: any = useNavigation();

  return (
    <View>
      <Text>Like</Text>
      <Button
        title="GO TO LIKE DETAIL"
        onPress={() => navigation.navigate("LikeDetail")}
      />
    </View>
  );
};

export default Like;
