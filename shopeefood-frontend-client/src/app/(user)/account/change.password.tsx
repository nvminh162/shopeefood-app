import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { ChangePasswordSchema } from "@/utils/validate.schema";
import { Formik, FormikProps } from "formik";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ShareButton from "@/components/button/share.button";
import { APP_COLOR } from "@/utils/constants";
import { useRef, useState } from "react";
import Toast from "react-native-root-toast";
import { changePasswordAPI } from "@/utils/api";

const ChangePasswordPage = () => {
  const formikRef = useRef<FormikProps<any>>(null);

  const { appState } = useCurrentApp();
  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;
  const baseImage = `${backend}/images/avatar`;

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (appState?.user._id) {
      setIsLoading(true);
      const res = await changePasswordAPI(currentPassword, newPassword);
      if (res.data) {
        Toast.show("Updated information user successfully!", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });

        formikRef?.current?.resetForm();
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
          innerRef={formikRef}
          validationSchema={ChangePasswordSchema}
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={(values) =>
            handleChangePassword(
              values?.currentPassword ?? "",
              values?.newPassword ?? ""
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
                secureTextEntry
                title="Current password"
                onTextChange={handleChange("currentPassword")}
                onBlur={handleBlur("currentPassword")}
                value={values.currentPassword}
                error={errors.currentPassword as string}
                touched={touched.currentPassword}
              />
              <ShareInput
                secureTextEntry
                title="New password"
                onTextChange={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
                error={errors.newPassword as string}
                touched={touched.newPassword}
              />
              <ShareInput
                secureTextEntry
                title="Confirm password"
                onTextChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                error={errors.confirmPassword as string}
                touched={touched.confirmPassword}
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

export default ChangePasswordPage;
