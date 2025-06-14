import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  appState: IUserLogin | null;
  setAppState: (v: any) => void;
}

const AppContext = createContext<AppContextType | null>(null);

interface IProps {
  children: React.ReactNode;
}

export const useCurrentApp = () => {
  const current = useContext(AppContext);
  if (!current) {
    throw new Error(
      "useCurrentApp has to be used within <AppContext.Provider>"
    );
  }
  return current;
};

const demoUserForTest = {
  user: {
    email: "admin@gmail.com",
    _id: "6841cba3a2bd4b724e3b088a",
    name: "I'm admin",
    role: "USERS",
    phone: "",
    address: [],
    avatar: "default-user.png",
  },
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiX2lkIjoiNjg0MWNiYTNhMmJkNGI3MjRlM2IwODhhIiwibmFtZSI6IkknbSBhZG1pbiIsInJvbGUiOiJVU0VSUyIsInBob25lIjoiIiwiYWRkcmVzcyI6W10sImF2YXRhciI6ImRlZmF1bHQtdXNlci5wbmcifSwic3ViIjoiNjg0MWNiYTNhMmJkNGI3MjRlM2IwODhhIiwiaWF0IjoxNzQ5ODk2MTI4LCJleHAiOjE4MzYyOTYxMjh9.9uJ9sd0bFaQp2z33Pi27_5hSGhWn5qMqIiei7y1wRjA",
};

const AppProvider = (props: IProps) => {
  const [appState, setAppState] = useState<IUserLogin | null>(demoUserForTest); //null
  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
