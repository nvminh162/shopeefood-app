import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const UserInfo = () => {
  const { appState } = useCurrentApp();
  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;
  const baseImage = `${backend}/images/avatar`;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ alignItems: "center", gap: 5 }}>
            <Image
              style={{ height: 150, width: 150 }}
              source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
            />
            <Text>{appState?.user.name}</Text>
          </View>
          <View style={{ marginTop: 20, gap: 20 }}>
            <ShareInput title="Họ tên" value={appState?.user.name} />
            <ShareInput title="Email" value={appState?.user.email} />
            <ShareInput title="Số điện thoại" value={appState?.user?.phone} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 50,
  },
});

export default UserInfo;
