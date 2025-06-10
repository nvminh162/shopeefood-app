import { Background } from "@react-navigation/elements";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      Background: "transparent",
    },
  };

  return (
    <GestureHandlerRootView>
      {/* GestureHandlerRootView: Carousel */}
      <RootSiblingParent>
        {/* RootSiblingParent: Display message */}
        <SafeAreaView style={{ flex: 1 }}>
          <ThemeProvider value={navTheme}>
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
              <Stack.Screen
                name="(auth)/signup"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/verify"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="product/index"
                options={{ headerTitle: "Sản phẩm" }}
              />
              <Stack.Screen
                name="(auth)/login"
                options={{ headerTitle: "Đăng nhập", headerShown: false }}
              />
            </Stack>
          </ThemeProvider>
        </SafeAreaView>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
