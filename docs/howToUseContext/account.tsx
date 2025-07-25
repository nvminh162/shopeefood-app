import { useCurrentTheme } from "@/context/app.context";
import { Text, View } from "react-native";

const AccountTab = () => {
  const { theme } = useCurrentTheme()

  return (
    <View>
      <Text>{theme}</Text>
    </View>
  );
};

export default AccountTab;
