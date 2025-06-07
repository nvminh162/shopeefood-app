import facebookLogo from "@/assets/auth/facebook.png";
import googleLogo from "@/assets/auth/google.png";
import backgroundAuth from "@/assets/auth/welcome-background.png";
import ShareButton from "@/components/button/share.button";
import TextBetweenLine from "@/components/button/text.between.line";
import { APP_COLOR } from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Redirect } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  welcomeText: {
    flex: 0.6,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    fontWeight: "bold",
  },
  welcomeBtn: { flex: 0.4, gap: 30 },
  heading: { fontSize: 40, fontWeight: "600" },
  body: { fontSize: 30, color: APP_COLOR.ORANGE, marginVertical: 10 },
  footer: { fontWeight: "600" },
});

const WelcomePage = () => {
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
          <View style={styles.welcomeText}>
            <Text style={styles.heading}>Welcome to</Text>
            <Text style={styles.body}>ShopeeFood</Text>
            <Text style={styles.footer}>
              Your favourite foods delivered fast at your door.
            </Text>
          </View>
          <View style={styles.welcomeBtn}>
            <TextBetweenLine title="Sign in with"/>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 30,
              }}
            >
              <ShareButton
                title="Facebook"
                onPress={() => alert("Facebook")}
                textStyle={{ textTransform: "uppercase" }}
                buttonStyle={{
                  justifyContent: "center",
                  borderRadius: 30,
                  backgroundColor: "#fff",
                }}
                icon={<Image source={facebookLogo} />}
              />
              <ShareButton
                title="Google"
                onPress={() => alert("Google")}
                textStyle={{ textTransform: "uppercase" }}
                buttonStyle={{
                  justifyContent: "center",
                  borderRadius: 30,
                  backgroundColor: "#fff",
                  paddingHorizontal: 20,
                }}
                icon={<Image source={googleLogo} />}
              />
            </View>
            <ShareButton
              title="Login with Email"
              onPress={() => alert("Email")}
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
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Text style={{ color: "white" }}>Don't have an account?</Text>
              <Link href={"/(auth)/signup"}>
                <Text
                  style={{
                    fontWeight: "700",
                    textDecorationLine: "underline",
                    color: "white",
                  }}
                >
                  Sign Up
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default WelcomePage;
