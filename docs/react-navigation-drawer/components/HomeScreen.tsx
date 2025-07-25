import { Button, StyleSheet, Text, View } from "react-native";

function HomeScreen(props: any) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <View style={styles.button}>
        <Button
          title="Chuyển trang Detail"
          onPress={() => navigation.navigate("details")}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Go to User 1"
          onPress={() =>
            navigation.navigate("details", { userId: 1, name: "@nvminh162" })
          }
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Go to User 2"
          onPress={() =>
            navigation.navigate("details", { userId: 2, name: "@eric" })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
  },
});

export default HomeScreen;
