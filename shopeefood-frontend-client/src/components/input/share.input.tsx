import { APP_COLOR } from "@/utils/constants";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { KeyboardType, StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  inputGroup: { gap: 10 },
  text: { fontSize: 18 },
  input: {
    borderColor: APP_COLOR.GREY,
    borderWidth: 1,
    paddingHorizontal: 10,
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
  onBlur?: (v: any) => void;
  onTextChange?: (v: any) => void;
  error?: string;
  touched?: any;
  editable?: boolean;
}

const ShareInput = (props: IProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const {
    title,
    keyboardType,
    secureTextEntry = false,
    value,
    onBlur,
    onTextChange,
    error,
    touched,
    editable = true,
  } = props;
  return (
    <View style={styles.inputGroup}>
      {title && <Text style={styles.text}>{title}</Text>}
      <View>
        <TextInput
          value={value}
          keyboardType={keyboardType}
          style={[
            styles.input,
            { 
              borderColor: isFocus ? APP_COLOR.ORANGE : APP_COLOR.GREY,
              backgroundColor: editable === false ? APP_COLOR.GREY : 'transparent'
            },
          ]}
          onFocus={() => setIsFocus(true)}
          onBlur={(e) => {
            if (onBlur) {
              onBlur(e);
            }
            setIsFocus(false);
          }}
          editable={editable}
          onChangeText={onTextChange}
          secureTextEntry={secureTextEntry && !isShowPassword}
        />
        {touched && error && <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>}
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
