import facebookLogo from '@/assets/auth/facebook.png';
import googleLogo from '@/assets/auth/google.png';
import { Image, StyleSheet, View } from "react-native";
import ShareButton from "./share.button";

const SocialButton = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <ShareButton
          title="Facebook"
          onPress={() => alert("Facebook")}
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
          onPress={() => alert("Google")}
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

export default SocialButton;
