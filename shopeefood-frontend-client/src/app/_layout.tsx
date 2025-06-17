import AppProvider from "context/app.context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, ErrorBoundaryProps } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F8" }}>
      <View style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}>
        {/* Error Icon */}
        <View style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "#FEE2E2",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20
        }}>
          <Text style={{ fontSize: 50 }}>❌</Text>
        </View>
        
        {/* Error Card */}
        <View style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: 15,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          marginBottom: 30,
          borderWidth: 1,
          borderColor: "#FECACA"
        }}>
          <Text style={{ 
            color: "#B91C1C", 
            fontSize: 22, 
            fontWeight: "bold",
            marginBottom: 15,
            textAlign: "center" 
          }}>
            Unable to connect
          </Text>
          
          <Text style={{ 
            color: "#4B5563", 
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 15,
            textAlign: "center"
          }}>
            Unable to connect to server. Please check your network connection and try again.
          </Text>
          
          <View style={{
            backgroundColor: "#FEF2F2",
            padding: 12,
            borderRadius: 8,
            borderLeftWidth: 4,
            borderLeftColor: "#EF4444"
          }}>
            <Text style={{ color: "#7F1D1D", fontSize: 14 }}>
              {props.error.message}
            </Text>
          </View>
        </View>
        
        {/* Retry Button */}
        <View style={{ width: "100%" }}>
          <TouchableOpacity 
            style={{
              backgroundColor: "#EF4444",
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10
            }}
            onPress={props.retry}
          >
            <Text style={{ 
              color: "white", 
              fontSize: 16, 
              fontWeight: "bold" 
            }}>
              Contact Admin @nvminh162
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const RootLayout = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      Background: "white",
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* GestureHandlerRootView: Carousel */}
      <RootSiblingParent>
        {/* RootSiblingParent: Display message */}
        <AppProvider>
          {/* Context App */}
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
        </AppProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
