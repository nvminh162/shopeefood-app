import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

interface IProps {
  questionText: string;
  questionBtnName: string;
  path: string;
  textColor?: "white" | "black";
}

const QuestionButton = (props: IProps) => {
  const { questionText, questionBtnName, path, textColor = "black" } = props;
  return (
    <View style={styles.container}>
      <Text style={{ color: textColor }}>{questionText}</Text>
      <Link href={path as any}>
        <Text style={[styles.questionBtnName, { color: textColor }]}>
          {questionBtnName}
        </Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  questionBtnName: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

export default QuestionButton;
