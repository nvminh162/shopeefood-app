import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  //default dflex
  container: {
    flex: 1,
    marginTop: 40,
    borderWidth: 1,
    borderColor: "red",
    // flexDirection: "row", //default is column
    justifyContent: "center",
    alignItems: "center",
  },
  item1: { backgroundColor: "red", padding: 20, height: 100 },
  item2: { backgroundColor: "green", padding: 20, height: 150 },
  item3: { backgroundColor: "blue", padding: 20, height: 250 },
  item4: { backgroundColor: "yellow", padding: 20, height: 350 },
});

const FlexBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item1}>
        <Text>Item 1</Text>
      </View>
      <View style={styles.item2}>
        <Text>Item 2</Text>
      </View>
      <View style={styles.item3}>
        <Text>Item 3</Text>
      </View>
      <View style={styles.item4}>
        <Text>Item 4</Text>
      </View>
    </View>
  );
};

export default FlexBox;
