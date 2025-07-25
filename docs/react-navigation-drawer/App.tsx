// Only import react-native-gesture-handler on native platforms
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./components/HomeScreen";
import DetailsScreen from "./components/DetailsScreen";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Profile: DetailsScreen,
  },
});

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="details">
          <Drawer.Screen
            name="home"
            component={HomeScreen}
            options={{
              headerTitle: "Trang chủ",
              drawerLabel: "Trang chủ",
            }}
          />
          <Drawer.Screen
            name="details"
            component={DetailsScreen}
            options={{
              headerTitle: "Xem chi tiết",
              drawerLabel: "Xem chi tiết",
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
