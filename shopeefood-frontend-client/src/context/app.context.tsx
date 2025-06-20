import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  appState: IUserLogin | null;
  setAppState: (v: any) => void;
  cart: ICart | Record<string, never>;
  setCart: (v: any) => void;
  restaurant: IRestaurant | null;
  setRestaurant: (v: any) => void;
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
  const [cart, setCart] = useState<ICart | Record<string, never>>({});
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);

  return (
    <AppContext.Provider
      value={{ appState, setAppState, cart, setCart, restaurant, setRestaurant }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
