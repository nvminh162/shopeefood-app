import axios from "axios";
import { Platform } from "react-native";

const backend =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_ANDROID_API_URL
    : process.env.EXPO_PUBLIC_IOS_API_URL;

const instance = axios.create({
  baseURL: backend,
});

export default instance;
