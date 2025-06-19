import ShareButton from "@/components/button/share.button";
import { useCurrentApp } from "@/context/app.context";
import { getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Linking from 'expo-linking';

const AccountTab = () => {
  const { appState } = useCurrentApp();
  const baseImage = `${getURLBaseBackend()}/images/avatar/`;
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure log out your session?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: async () => {
          await AsyncStorage.removeItem("access_token");
          router.replace("/(auth)/welcome")
        },
      },
    ]);
  };

  const openWebLink = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Lỗi", "Không thể mở liên kết này");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: APP_COLOR.ORANGE,
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 60, width: 60 }}
          source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
        />
        <View>
          <Text style={{ color: "white", fontSize: 20 }}>
            {appState?.user.name}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* Update info */}
        <Pressable
          onPress={() => router.navigate("/(user)/account/update.information")}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Feather name="user-check" size={20} color="black" />
            <Text>Update information</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
        {/* Change password */}
        <Pressable
          onPress={() => router.navigate("/(user)/account/change.password")}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialIcons name="password" size={20} color="black" />
            <Text>Change password</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
        {/* Language */}
        <Pressable
          onPress={() => alert("@nvminh162 said: This function in development")}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Feather name="globe" size={20} color="black" />
            <Text>Language</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
        
        <Pressable
          onPress={() => openWebLink("https://facebook.com/nvminh162")}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Feather name="external-link" size={20} color="black" />
            <Text>About</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
      </View>

      <View style={{ marginVertical: 10, gap: 15 }}>
        <ShareButton
          title="Log out"
          textStyle={{ color: "#fff", fontSize: 17 }}
          buttonStyle={{
            justifyContent: "center",
            backgroundColor: APP_COLOR.ORANGE,
            paddingVertical: 15,
            marginHorizontal: 15,
          }}
          pressStyle={{ alignSelf: "stretch" }}
          onPress={handleLogout}
        />
        <Text style={{ textAlign: "center", color: APP_COLOR.GREY }}>
          Version: 1.0.0 - @nvminh162
        </Text>
      </View>
    </View>
  );
};

export default AccountTab;
