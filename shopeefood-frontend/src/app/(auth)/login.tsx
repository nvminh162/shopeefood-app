import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import TextBetweenLine from "@/components/button/text.between.line";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20, gap: 10, marginTop: 30 },
});

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    console.log(">>> check input: ", email, password);
  }
  
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
      <View style={{ marginVertical: 10 }} />
      {/* Spacing between input and button */}
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
              color: APP_COLOR.ORANGE
            }}
          >
            Forgot password?
          </Text>
        </Link>
      </View>
      <View style={{flex: 1, gap: 30}}>
        <TextBetweenLine title="Sign in with" textColor="black"/>
        <SocialButton />
      </View>
    </View>
  );
};

export default Login;
