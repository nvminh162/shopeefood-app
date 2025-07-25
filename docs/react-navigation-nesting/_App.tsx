import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./components/home";
import HomeDetail from "./components/home.detail";
import Like from "./components/like";
import LikeDetail from "./components/like.detail";
import About from "./components/about";
import ChangePassword from "./components/change.password";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabApp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Like" component={Like} />
    </Tab.Navigator>
  );
};

const StackApp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HomeDetail" component={HomeDetail} />
      <Stack.Screen name="LikeDetail" component={LikeDetail} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="StackApp" component={StackApp} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
