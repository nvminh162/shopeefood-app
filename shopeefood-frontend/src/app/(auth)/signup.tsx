import QuestionButton from "@/components/button/question.button";
import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { registerAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import { Formik } from "formik";
import { RegisterSchema } from "@/utils/validate.schema";

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20, gap: 10 },
});

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      const res = await registerAPI(fullName, email, password);
      if (res.data) {
        router.replace({
          pathname: "/(auth)/verify",
          params: { email: email }, //Send data by navigate
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
          Register Now
        </Text>
      </View>

      {/* Method 1: Controlled component */}
      {/* <ShareInput title="Fullname" value={name} setValue={setName} />
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
      <ShareButton
        title="Sign Up"
        onPress={handleSignUp}
        textStyle={{ color: "#fff", fontSize: 19 }}
        buttonStyle={{
          justifyContent: "center",
          borderRadius: 30,
          backgroundColor: APP_COLOR.ORANGE,
          paddingVertical: 15,
        }}
        pressStyle={{ alignSelf: "stretch" }}
      /> */}

      {/* Method 2: uncontrolled component (Formik) */}
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{ fullName: "", email: "", password: "" }}
        onSubmit={(values) =>
          handleSignUp(values.fullName, values.email, values.password)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <ShareInput
              title="Fullname"
              onTextChange={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
              error={errors.fullName}
            />
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
            <View style={{ marginVertical: 5 }} />
            <ShareButton
              title="Sign Up"
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
        questionText="Already have an account?"
        questionBtnName="Sign in"
        path="/(auth)/login"
      />
      <SocialButton title="Sign up with" textColor="black" />
    </View>
  );
};

export default SignUpPage;
