import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountTab = () => {
  const { appState } = useCurrentApp();
  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;
  const baseImage = `${backend}/images/avatar`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 50,
  },
});

export default AccountTab;
