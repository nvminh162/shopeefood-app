import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constants";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20, gap: 10 },
});

const SignUpPage = () => {
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
        <ShareInput title="Fullname" />
        <ShareInput title="Email" keyboardType="email-address" />
        <ShareInput title="Password" />
        <View style={{ marginVertical: 10 }} />
        {/* Spacing between input and button */}
        <ShareButton
          title="Sign Up"
          onPress={() => alert("Sign Up")}
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
