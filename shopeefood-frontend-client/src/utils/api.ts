import instance from "@/utils/axios.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const registerAPI = (name: string, email: string, password: string) => {
  const url = `/api/v1/auth/register`;
  return instance.post<IBackendRes<IRegister>>(url, {
    name,
    email,
    password,
  });
};

export const verifyCodeAPI = (email: string, code: string) => {
  const url = `/api/v1/auth/verify-code`;
  return instance.post<IBackendRes<IRegister>>(url, {
    email,
    code,
  });
};

export const resendCodeAPI = (email: string) => {
  const url = `/api/v1/auth/verify-email`;
  return instance.post<IBackendRes<IRegister>>(url, {
    email,
  });
};

export const loginAPI = (email: string, password: string) => {
  const url = `/api/v1/auth/login`;
  return instance.post<IBackendRes<IUserLogin>>(url, {
    username: email,
    password,
  });
};

export const getAccountAPI = () => {
  const url = `/api/v1/auth/account`;
  return instance.get<IBackendRes<IUserLogin>>(url);
};

export const getTopRestaurantAPI = (ref: string) => {
  const url = `/api/v1/restaurants/${ref}`;
  return instance.post<IBackendRes<ITopRestaurant[]>>(url);
};

export const getRestaurantByIdAPI = (id: string) => {
  const url = `/api/v1/restaurants/${id}`;
  return instance.get<IBackendRes<IRestaurant>>(url);
};

export const printAsyncStorage = () => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys!, (error, stores) => {
      let asyncStorage: any = {};
      stores?.map((result, i, store) => {
        asyncStorage[store[i][0]] = store[i][1];
      });
      console.log(JSON.stringify(asyncStorage, null, 2));
    });
  });
};

export const getURLBaseBackend = () => {
  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;
  return backend;
};

export const processDataRestaurantMenu = (restaurant: IRestaurant | null) => {
  if (!restaurant) return [];
  return restaurant?.menu?.map((menu, index) => {
    return {
      index,
      key: menu._id,
      title: menu.title,
      data: menu.menuItem,
    };
  });
};

export const currencyFormatter = (value: any) => {
  const options = {
    significantDigits: 2,
    thousandsSeparator: ".",
    decimalSeparator: ",",
    symbol: "đ",
  };
  if (typeof value !== "number") value = 0.0;
  value = value.toFixed(options.significantDigits);
  const [currency, decimal] = value.split(".");
  return `${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )} ${options.symbol}`;
};
