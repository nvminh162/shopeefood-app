import QuestionButton from "@/components/button/question.button";
import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { loginAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { LoginSchema } from "@/utils/validate.schema";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20, gap: 10 },
});

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await loginAPI(email, password);
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
    } finally {
      setIsLoading(false);
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

      {/* <ShareInput
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
        style={{ marginVertical: 15, flexDirection: "row", justifyContent: "center" }} >
        <Link href={"/"}>
          <Text style={{ fontWeight: "700", color: APP_COLOR.ORANGE }} >
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
      /> */}

      <Formik
        validationSchema={LoginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values.email, values.password)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <ShareInput
              title="Email"
              onTextChange={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={errors.email}
              keyboardType="email-address"
            />
            <ShareInput
              title="Password"
              onTextChange={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={errors.password}
            />
            <View
              style={{
                marginVertical: 15,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Link href={"/"}>
                <Text style={{ fontWeight: "700", color: APP_COLOR.ORANGE }}>
                  Forgot password?
                </Text>
              </Link>
            </View>
            <ShareButton
              title="Login"
              onPress={handleSubmit}
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
          </>
        )}
      </Formik>

      <QuestionButton
        questionText="Don't have an account?"
        questionBtnName="Sign up"
        path="/(auth)/signup"
      />
      <SocialButton title="Sign in with" textColor="black" />
    </View>
  );
};

export default Login;
