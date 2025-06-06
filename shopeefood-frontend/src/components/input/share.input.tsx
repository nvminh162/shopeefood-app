import { APP_COLOR } from "@/utils/constants";
import { useState } from "react";
import { KeyboardType, StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  inputGroup: { padding: 5, gap: 10 },
  text: { fontSize: 18 },
  input: {
    borderColor: APP_COLOR.GREY,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

interface IProps {
  title?: string;
  keyboardType?: KeyboardType;
}

const ShareInput = (props: IProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const { title, keyboardType } = props;
  return (
    <View style={styles.inputGroup}>
      {title && <Text style={styles.text}>{title}</Text>}
      <TextInput
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        keyboardType={keyboardType}
        style={[styles.input, { borderColor: isFocus ? APP_COLOR.ORANGE : APP_COLOR.GREY }]}
      />
    </View>
  );
};

export default ShareInput;
