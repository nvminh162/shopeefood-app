import { Text, View } from "react-native";

interface IProps {
  title: string;
  textColor?: "white" | "black";
}

const TextBetweenLine = (props: IProps) => {
  const { title, textColor = "white" } = props;
  return (
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
  );
};

export default TextBetweenLine;
