import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20, gap: 10 },
});

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          onPress={() => {
            console.log(name, email, password);
          }}
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
    </SafeAreaView>
  );
};

export default SignUpPage;
