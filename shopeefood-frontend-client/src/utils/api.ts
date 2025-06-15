import instance from "@/utils/axios.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
