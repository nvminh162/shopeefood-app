import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import TextBetweenLine from "@/components/button/text.between.line";
import ShareInput from "@/components/input/share.input";
import { loginAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20, gap: 10, marginTop: 30 },
});

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await loginAPI(email, password);
      setIsLoading(false);
      if (res.data) {
        router.replace({ pathname: "/(tabs)" });
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;
        Toast.show(m, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });

        if (res.statusCode === 400) {
          router.replace({
            pathname: "/(auth)/verify",
            params: { email: email, isLogin: 1 },
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginVertical: 30,
          }}
        >
          Login
        </Text>
      </View>
      <ShareInput
        title="Email"
        keyboardType="email-address"
        value={email}
        setValue={setEmail}
      />
      <ShareInput
        title="Password"
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />
      <View
        style={{
          marginVertical: 15,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Link href={".."}>
          <Text
            style={{
              fontWeight: "700",
              color: APP_COLOR.ORANGE,
            }}
          >
            Forgot password?
          </Text>
        </Link>
      </View>
      <ShareButton
        title="Login"
        onPress={handleLogin}
        textStyle={{ color: "#fff", fontSize: 19 }}
        buttonStyle={{
          justifyContent: "center",
          borderRadius: 30,
          backgroundColor: APP_COLOR.ORANGE,
          paddingVertical: 15,
        }}
        pressStyle={{ alignSelf: "stretch" }}
        isLoading={isLoading}
      />
      <View
        style={{
          marginVertical: 15,
          flexDirection: "row",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text>Don't have an account?</Text>
        <Link href={"/(auth)/signup"}>
          <Text
            style={{
              fontWeight: "700",
              textDecorationLine: "underline",
            }}
          >
            Sign up
          </Text>
        </Link>
      </View>
      <View style={{ flex: 1, gap: 30 }}>
        <TextBetweenLine title="Sign in with" textColor="black" />
        <SocialButton />
      </View>
    </View>
  );
};

export default Login;
