
import { APP_COLOR } from "@/utils/constants";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { KeyboardType, StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  inputGroup: { padding: 5, gap: 5 },
  text: { fontSize: 18 },
  input: {
    borderColor: APP_COLOR.GREY,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 10,
  },
  eye: { position: "absolute", right: 15, top: 10 },
});

interface IProps {
  title?: string;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  value: any;
  setValue: (v: any) => void;
}

const ShareInput = (props: IProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const {
    title,
    keyboardType,
    secureTextEntry = false,
    value,
    setValue,
  } = props;
  
  return (
    <View style={styles.inputGroup}>
      {title && <Text style={styles.text}>{title}</Text>}
      <View>
        <TextInput
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          keyboardType={keyboardType}
          style={[
            styles.input,
            { borderColor: isFocus ? APP_COLOR.ORANGE : APP_COLOR.GREY },
          ]}
          secureTextEntry={secureTextEntry && !isShowPassword}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        {secureTextEntry && (
          <Entypo
            onPress={() => setIsShowPassword(!isShowPassword)}
            style={styles.eye}
            name={isShowPassword ? "eye-with-line" : "eye"}
            size={20}
            color="black"
          />
        )}
      </View>
    </View>
  );
};

export default ShareInput;
