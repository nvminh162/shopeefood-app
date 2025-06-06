import { APP_COLOR } from "@/utils/constants";
import { StyleSheet, Text, View } from "react-native";
import OTPTextView from "react-native-otp-textinput";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: "600",
    marginVertical: 20,
  },
});

const VerifyPage = () => {
  return (
    <View>
      <Text style={styles.heading}> Xác thực tài khoản</Text>
      <Text style={{ marginVertical: 10 }}>
        Vui lòng nhập mã xác nhận tới email: ...
      </Text>
      <View style={{ marginVertical: 20 }}>
        <OTPTextView
          inputCount={6}
          inputCellLength={1}
          tintColor={APP_COLOR.ORANGE}
          textInputStyle={{
            borderWidth: 1,
            borderColor: APP_COLOR.GREY,
            borderBottomWidth: 1,
            borderRadius: 5,
            // @ts-ignore:next-line
            color: APP_COLOR.ORANGE,
            keyboardType: "numeric",
          }}
        />
      </View>
      <View style={{ flexDirection: "row", marginVertical: 10, gap: 10 }}>
        <Text>Can't get OTP,</Text>
        <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }}>
          Gửi lại
        </Text>
      </View>
    </View>
  );
};

export default VerifyPage;
