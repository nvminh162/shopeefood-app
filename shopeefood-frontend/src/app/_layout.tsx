import { Stack } from "expo-router";

const RootLayout = () => {
  return (
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
      <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerTitle: "Trang chủ" }} />
      <Stack.Screen
        name="product/index"
        options={{ headerTitle: "Sản phẩm" }}
      />
      <Stack.Screen
        name="(auth)/login"
        options={{ headerTitle: "Đăng nhập" }}
      />
    </Stack>
  );
};

export default RootLayout;
