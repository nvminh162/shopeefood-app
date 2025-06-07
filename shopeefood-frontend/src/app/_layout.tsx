import { Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <RootSiblingParent>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/verify" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerTitle: "Trang chủ" }} />
          <Stack.Screen
            name="product/index"
            options={{ headerTitle: "Sản phẩm" }}
          />
          <Stack.Screen
            name="(auth)/login"
            options={{ headerTitle: "Đăng nhập", headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </RootSiblingParent>
  );
};

export default RootLayout;
