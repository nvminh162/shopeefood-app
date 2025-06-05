import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "red",
    borderWidth: 2,
  },
  welcomeText: {
    flex: 0.6,
    borderColor: "green",
    borderWidth: 2,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
  },
  welcomeBtn: { flex: 0.4, borderColor: "blue", borderWidth: 2 },
  heading: { fontSize: 40, fontWeight: "600" },
  body: { fontSize: 30, color: "orange", marginVertical: 10 },
  footer: {},
  btnContainer: {},
  btnContent: {
    backgroundColor: "green",
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
        <Text>Sign in</Text>
        <View style={styles.btnContainer}>
          <View style={styles.btnContent}>
            <Text>Facebook</Text>
          </View>
          <View style={styles.btnContent}>
            <Text>Google</Text>
          </View>
        </View>
        <Text>Start with your email</Text>
        <Text>Already have an account? Sign in</Text>
      </View>
    </View>
  );
};

export default WelcomePage;
