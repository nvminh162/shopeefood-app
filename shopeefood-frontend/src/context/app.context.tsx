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

const AppProvider = (props: IProps) => {
  const [appState, setAppState] = useState<IUserLogin | null>(null);
  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
