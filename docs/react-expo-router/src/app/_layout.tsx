import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
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
