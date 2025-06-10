import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{ 
          headerShown: false,
          tabBarStyle: {
            height: 50,
            paddingBottom: 5,
          }
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="setting" />
      </Tabs>
    </>
  );
};

export default TabLayout;
