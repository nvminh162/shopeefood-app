import { LoginSchema } from "@/utils/validate.schema";
import { Formik } from "formik";
import { Button, Text, TextInput, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ marginTop: 40 }}>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log("check values = ", values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ margin: 10 }}>
            <Text>Email</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: "#ccc" }}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {/* Text notify */}
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}
            <View style={{ marginVertical: 10 }}></View>
            <Text>Password</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: "#ccc" }}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {/* Text notify */}
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}
            <View style={{ marginVertical: 10 }}></View>
            <Button onPress={handleSubmit as any} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
}
