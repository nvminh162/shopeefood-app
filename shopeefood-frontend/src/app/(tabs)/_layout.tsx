import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 50,
            paddingBottom: 5,
            backgroundColor: "#fff"
          },
        }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="setting" />
    </Tabs>
  );
};

export default TabLayout;
