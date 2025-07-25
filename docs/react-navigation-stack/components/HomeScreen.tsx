import { Button, StyleSheet, Text, View } from "react-native";

function HomeScreen(props: any) {
  // console.log(props);
  /* 
  {
    "navigation": {
      "addListener": [Function addListener],
      "canGoBack": [Function canGoBack],
      "dispatch": [Function dispatch],
      "getId": [Function getId],
      "getParent": [Function getParent],
      "getState": [Function getState],
      "goBack": [Function anonymous],
      "isFocused": [Function isFocused],
      "navigate": [Function anonymous],
      "navigateDeprecated": [Function anonymous],
      "pop": [Function anonymous],
      "popTo": [Function anonymous],
      "popToTop": [Function anonymous],
      "preload": [Function anonymous],
      "push": [Function anonymous],
      "removeListener": [Function removeListener],
      "replace": [Function anonymous],
      "replaceParams": [Function anonymous],
      "reset": [Function anonymous],
      "setOptions": [Function setOptions],
      "setParams": [Function anonymous]
    },
    "route": {
      "key": "Home-GHkuz7lB_7_5slOvie8-t",
      "name": "Home",
      "params": undefined
    }
  }
  */
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
