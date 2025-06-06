import instance from "@/utils/axios.customize";

export const registerAPI = (name: string, email: string, password: string) => {
  const url = `/api/v1/auth/register`;
  return instance.post<IBackendRes<IRegister>>(url, {
    name,
    email,
    password,
  });
};
