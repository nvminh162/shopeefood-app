import { useCurrentApp } from "@/context/app.context";
import { getAccountAPI } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { APP_FONT } from "@/utils/constants";

SplashScreen.preventAutoHideAsync();

const RootPage = () => {
  const { setAppState } = useCurrentApp();
  const [state, setState] = useState<any>();
  //Load font
  const [loaded, error] = useFonts({
    [APP_FONT]: require("@/assets/font/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Check if access token exists first
        const access_token = await AsyncStorage.getItem("access_token");

        // If no access token, go directly to welcome screen
        if (!access_token) {
          router.replace("/(auth)/welcome");
          return;
        }

        const res = await getAccountAPI();
        if (res.data) {
          setAppState({
            user: res.data.user,
            access_token: access_token,
          });
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)/welcome");
        }
      } catch (e) {
        setState(() => {
          throw new Error("Can't connect to Backend Server!");
        });
        console.log("Can't connect to Backend Server!");
      } finally {
        // Tell the application to render
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return <></>;
};

export default RootPage;
