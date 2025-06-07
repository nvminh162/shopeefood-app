import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { registerAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20, gap: 10 },
});

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    try {
      const res = await registerAPI(name, email, password);
      if (res.data) {
        router.replace({
          pathname: "/(auth)/verify",
          params: { email: email } //Send data by navigate
        });
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;
        Toast.show(m, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });
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
          Register Now
        </Text>
      </View>
      <ShareInput title="Fullname" value={name} setValue={setName} />
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
      <View style={{ marginVertical: 10 }} />
      {/* Spacing between input and button */}
      <ShareButton
        title="Sign Up"
        onPress={handleSignUp}
        textStyle={{ color: "#fff" }}
        buttonStyle={{
          justifyContent: "center",
          borderRadius: 30,
          backgroundColor: APP_COLOR.ORANGE,
          paddingVertical: 15,
        }}
        pressStyle={{ alignSelf: "stretch" }}
      />
      <View
        style={{
          marginVertical: 15,
          flexDirection: "row",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text>Already have an account?</Text>
        <Link href={"/(auth)/signup"}>
          <Text
            style={{
              fontWeight: "700",
              textDecorationLine: "underline",
            }}
          >
            Sign in
          </Text>
        </Link>
      </View>
      <SocialButton />
    </View>
  );
};

export default SignUpPage;
