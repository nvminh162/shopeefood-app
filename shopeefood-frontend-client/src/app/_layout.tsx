import AppProvider from "context/app.context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";

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
        <AppProvider>
          {/* Context App */}
          {/* <SafeAreaView style={{ flex: 1 }}> */}
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
                <Stack.Screen
                  name="(auth)/welcome"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="product/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/login"
                  options={{ headerShown: false }}
                />
              </Stack>
            </ThemeProvider>
          {/* </SafeAreaView> */}
        </AppProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
