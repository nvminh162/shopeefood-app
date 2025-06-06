import ShareButton from "@/components/button/share.button";
import { APP_COLOR } from "@/utils/constants";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    flex: 0.6,
    borderColor: "green",
    borderWidth: 2,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
  },
  welcomeBtn: { flex: 0.4, borderColor: "blue", borderWidth: 2, gap: 20 },
  heading: { fontSize: 40, fontWeight: "600" },
  body: { fontSize: 30, color: APP_COLOR.ORANGE, marginVertical: 10 },
  footer: {},
  btnContent: {
    backgroundColor: APP_COLOR.ORANGE,
    borderRadius: 5,
    padding: 20,
    alignSelf: "flex-start",
  },
  btnText: {
    textTransform: "uppercase",
  },
});

const WelcomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeText}>
        <Text style={styles.heading}>Welcome to</Text>
        <Text style={styles.body}>ShopeeFood</Text>
        <Text style={styles.footer}>
          Your favourite foods delivered fast at your door.
        </Text>
      </View>
      <View style={styles.welcomeBtn}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "red",
            marginHorizontal: 50,
          }}
        >
          <Text
            style={{
              backgroundColor: "white",
              padding: 10,
              textAlign: "center",
              position: "relative",
              alignSelf: "center",
              top: 20,
            }}
          >
            Sign in with
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 30 }}
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
            icon={
              <MaterialCommunityIcons name="facebook" size={30} color="black" />
            }
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
            icon={<AntDesign name="google" size={24} color="black" />}
          />
        </View>
        <ShareButton
          title="Login with Email"
          onPress={() => alert("Email")}
          textStyle={{ color: "#fff" }}
          buttonStyle={{
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: "#2c2c2c",
            paddingVertical: 10,
            marginHorizontal: 55,
          }}
          pressStyle={{ alignSelf: "stretch" }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text style={{}}>Already have an account?</Text>
          <Text style={{ fontWeight: "700", textDecorationLine: "underline" }}>
            Sign in
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WelcomePage;
