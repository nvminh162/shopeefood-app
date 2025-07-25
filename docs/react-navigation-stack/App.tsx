import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import DetailsScreen from "./components/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            //style global cho header
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              title: "Trang chủ",
            }}
            /* title: chi truyền String, 
            như vậy tính customize không cao (ví dụ lấy động title) */
          />
          <Stack.Screen
            name="details"
            component={DetailsScreen}
            options={(props: any) => ({
              headerTitle: `Xem chi tiết ${props.route?.params?.userId ?? ""}`,
              //Style for Header override global
              headerStyle: {
                backgroundColor: "green",
              },
              headerTintColor: "#000",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            })}
            /* headerTitle: có thể truyền String hoặc function. 
            như vậy tính customize cao hơn (có thể lấy động title). 
            Ví dụ, bạn có thể truyền Component cho headerTitle. */
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
