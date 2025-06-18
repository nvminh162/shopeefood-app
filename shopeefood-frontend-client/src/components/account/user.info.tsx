import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { UpdateUserSchema } from "@/utils/validate.schema";
import { Formik } from "formik";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ShareButton from "../button/share.button";
import { APP_COLOR } from "@/utils/constants";
import { useState } from "react";
import Toast from "react-native-root-toast";
import { updateUserAPI } from "@/utils/api";

const UserInfo = () => {
  const { appState, setAppState } = useCurrentApp();
  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;
  const baseImage = `${backend}/images/avatar`;

  const handleUpdateUserInfo = async (
    fullName: string,
    email: string,
    phone: string
  ) => {
    if (appState?.user._id) {
      setIsLoading(true);
      const res = await updateUserAPI(appState?.user._id, fullName, phone);
      if (res.data) {
        Toast.show("Updated information user successfully!", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });

        setAppState({
          ...appState,
          user: {
            ...appState.user,
            name: fullName,
            phone: phone,
          },
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
      setIsLoading(false);
    }
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={styles.container}>
        <Formik
          validationSchema={UpdateUserSchema}
          initialValues={{
            fullName: appState?.user.name || "",
            email: appState?.user.email || "",
            phone: appState?.user.phone || "",
          }}
          onSubmit={(values) =>
            handleUpdateUserInfo(
              values?.fullName ?? "",
              values?.email ?? "",
              values?.phone ?? ""
            )
          }
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <View style={{ gap: 10 }}>
              <View style={{ alignItems: "center", gap: 5 }}>
                <Image
                  style={{ height: 150, width: 150 }}
                  source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
                />
                <Text>Hello, {appState?.user.name}</Text>
              </View>
              <ShareInput
                title="Fullname"
                onTextChange={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
                error={errors.fullName}
                touched={touched.fullName}
              />
              <ShareInput
                title="Email"
                onTextChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                editable={false}
              />
              <ShareInput
                title="Phone"
                onTextChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                error={errors.phone}
                touched={touched.phone}
              />
              <View style={{ marginBottom: 10 }} />
              <ShareButton
                title="Save"
                onPress={handleSubmit}
                textStyle={{ color: "#fff", fontSize: 19 }}
                buttonStyle={{
                  justifyContent: "center",
                  borderRadius: 30,
                  backgroundColor: APP_COLOR.ORANGE,
                  paddingVertical: 15,
                }}
                pressStyle={{ alignSelf: "stretch" }}
                disabled={!(isValid && dirty)}
                isLoading={isLoading}
              />
            </View>
          )}
        </Formik>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default UserInfo;
