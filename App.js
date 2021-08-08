import React, { useEffect } from "react";
import { BackHandler, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MyDrawer } from "./screens/CatalogScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import PlatoDetail from "./screens/PlatoDetail.js";

const Stack = createStackNavigator();

function MySatck() {
   return (
      <Stack.Navigator
         initialRouteName="Login"
         screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
               backgroundColor: "#3740FE",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
               fontWeight: "bold",
            },
         }}
      >
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Register" component={RegisterScreen} />
         <Stack.Screen name="Detail" component={PlatoDetail} />
         <Stack.Screen
            name="Catalogo"
            component={MyDrawer}
            options={({ title: "Catalogo de productos" }, { headerLeft: null })}
         />
      </Stack.Navigator>
   );
}

function App() {
   useEffect(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
         Alert.alert("oh no!", "Estas seguro que quieres salir de la aplicación?", [
            { text: "Cancel", onPress: () => null },
            { text: "YES", onPress: () => BackHandler.exitApp() },
         ]);
         return true;
      });

      return () => backHandler.remove();
   }, []);
   return (
      <NavigationContainer>
         <MySatck />
      </NavigationContainer>
   );
}

export default App;
