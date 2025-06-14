import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

const AccountTab = () => {
  const { appState } = useCurrentApp();
  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;
  const baseImage = `${backend}/images/avatar`;

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", gap: 5 }}>
        <Image
          style={{ height: 150, width: 150 }}
          source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
        />
        <Text>{appState?.user.name}</Text>
      </View>
      <View style={{ marginTop: 20, gap: 20 }}>
        <ShareInput
          title="Họ tên"
          value={appState?.user.name}
        />
        <ShareInput
          title="Email"
          keyboardType="email-address"
          value={appState?.user.email}
        />
        <ShareInput
          title="Số điện thoại"
          value={appState?.user?.phone}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 50,
  },
});

export default AccountTab;
