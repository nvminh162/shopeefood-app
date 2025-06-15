import facebookLogo from "@/assets/auth/facebook.png";
import googleLogo from "@/assets/auth/google.png";
import { Image, StyleSheet, Text, View } from "react-native";
import ShareButton from "./share.button";

interface IProps {
  title: string;
  textColor?: "white" | "black";
}

const SocialButton = (props: IProps) => {
  const { title, textColor = "white" } = props;
  return (
    <View style={styles.container}>
      {/* Title line */}
      <View
        style={{
          flexDirection: "row",
          gap: 15,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingHorizontal: 35,
          }}
        />
        <Text style={{ color: textColor, position: "relative", top: 10 }}>
          {title}
        </Text>
        <View
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingHorizontal: 35,
          }}
        />
      </View>
      {/* Button Wrapper */}
      <View style={styles.socialButtonsWrapper}>
        <ShareButton
          title="Facebook"
          onPress={() => alert("@nvminh162 said: This feature is under development")}
          textStyle={{ textTransform: "uppercase" }}
          buttonStyle={{
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: "#fff",
          }}
          icon={<Image source={facebookLogo} />}
        />
        <ShareButton
          title="Google"
          onPress={() => alert("@nvminh162 said: This feature is under development")}
          textStyle={{ textTransform: "uppercase" }}
          buttonStyle={{
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: "#fff",
            paddingHorizontal: 20,
          }}
          icon={<Image source={googleLogo} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 30,
  },
  socialButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
});

export default SocialButton;
