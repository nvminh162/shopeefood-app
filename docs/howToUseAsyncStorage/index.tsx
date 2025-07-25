import facebookLogo from "@/assets/auth/facebook.png";
import googleLogo from "@/assets/auth/google.png";
import backgroundAuth from "@/assets/auth/welcome-background.png";
import QuestionButton from "@/components/button/question.button";
import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import { APP_COLOR } from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Redirect, router } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  welcomeHeadingWrapper: {
    flex: 0.6,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    fontWeight: "bold",
  },
  welcomeText: { fontSize: 40, fontWeight: "600" },
  brandName: { fontSize: 30, color: APP_COLOR.ORANGE, marginVertical: 10 },
  slogan: { fontWeight: "600" },
  welcomeButtonWrapper: { flex: 0.4, gap: 15 },
});

const WelcomePage = () => {
  useEffect(() => {
    const test = async () => {
      await AsyncStorage.setItem("nvminh162", "nvminh162 value");
      await AsyncStorage.setItem("access_token", "nvminh162 token");
    };
    test();
  }, []);

  const handleClick = async () => {
    console.log(">>> me: ");
    console.log(await AsyncStorage.getItem("nvminh162"));
  };

  // Check data in Async Storage
  const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys!, (error, stores) => {
        let asyncStorage: any = {};
        stores?.map((result, i, store) => {
          asyncStorage[store[i][0]] = store[i][1];
        });
        console.log(JSON.stringify(asyncStorage, null, 2));
      });
    });
  };

  // if (true) return <Redirect href={"/(tabs)"}/>;

  return (
    <ImageBackground
      source={backgroundAuth}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <LinearGradient
        style={{ flex: 1 }}
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        locations={[0.5, 0.8]}
      >
        <View style={styles.container}>
          <View style={styles.welcomeHeadingWrapper}>
            <Text style={styles.welcomeText} onPress={printAsyncStorage}>
              Test Async Storage
            </Text>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.brandName}>ShopeeFood</Text>
            <Text style={styles.slogan}>
              Your favourite foods delivered fast at your door.
            </Text>
          </View>
          <View style={styles.welcomeButtonWrapper}>
            <SocialButton title="Sign in with" />
            <ShareButton
              title="Login with Email"
              onPress={() => router.navigate("/(auth)/login")}
              textStyle={{ color: "#fff" }}
              buttonStyle={{
                justifyContent: "center",
                borderRadius: 30,
                backgroundColor: "#2c2c2c",
                paddingVertical: 15,
                marginHorizontal: 50,
                borderColor: "#505050",
                borderWidth: 1,
              }}
              pressStyle={{ alignSelf: "stretch" }}
            />
            <QuestionButton
              questionText="Don't have an account?"
              questionBtnName="Sign Up"
              path="/(auth)/signup"
              textColor="white"
            />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default WelcomePage;
