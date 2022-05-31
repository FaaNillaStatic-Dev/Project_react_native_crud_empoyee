import Home from "./components/screen/Home";
import Login from "./components/screen/Login";
import AddScreen from "./components/screen/AddScreen";
import UpdateScreen from "./components/screen/UpdateScreen";
import SplashScreen from "./components/screen/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const root = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <root.Navigator>
        <root.Screen
          name="SplashScreen"
          component={SplashScreen}
          title="SplashScreen"
          options={{ headerShown: false }}
        />
        <root.Screen
          name="Login"
          component={Login}
          title="Login"
          options={{ headerShown: false }}
        />
        <root.Screen
          name="HomeScreen"
          component={Home}
          title="Data Karyawan"
          options={{ headerShown: false }}
        />

        <root.Screen
          name="AddScreen"
          component={AddScreen}
          title="Tambah Karyawan"
          options={{ title: "Tambah Karyawan" }}
        />
        <root.Screen
          name="UpdateScreen"
          component={UpdateScreen}
          title="Edit Karyawan"
          options={{ title: "Edit Karyawan" }}
        />
      </root.Navigator>
    </NavigationContainer>
  );
}
