import { APP_COLOR } from "@/utils/constants";
import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: APP_COLOR.ORANGE,
    borderColor: "red",
  },
});

interface IProps {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  pressStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

const ShareButton = (props: IProps) => {
  const {
    title,
    onPress,
    icon,
    textStyle,
    buttonStyle,
    pressStyle,
    isLoading = false,
  } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed === true || isLoading ? 0.5 : 1,
          alignSelf: "flex-start", //fit-content
        },
        pressStyle,
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      <View style={[styles.btnContainer, buttonStyle]}>
        {icon}
        {isLoading && <ActivityIndicator color="black" />}
        <Text style={textStyle}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default ShareButton;
