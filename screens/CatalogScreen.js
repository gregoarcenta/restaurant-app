import React, { useState, useEffect } from "react";
import {
   Text,
   View,
   Button,
   Image,
   StyleSheet,
   ScrollView,
   Dimensions,
   TouchableOpacity,
} from "react-native";

import { Card } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import firebase from "../database/firebase";
import data from "../database/data.json";

const Drawer = createDrawerNavigator();
var { width } = Dimensions.get("window");

function MyDrawer() {
   return (
      <Drawer.Navigator
         drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
         <Drawer.Screen name="Catalogs" component={CatalogScreen} />
      </Drawer.Navigator>
   );
}

function CustomDrawerContent({ navigation }) {
   return (
      <Button
         title="Cerrar Sesión"
         onPress={() => {
            firebase
               .auth()
               .signOut()
               .then(() => {
                  navigation.navigate("Login");
               })
               .catch((error) => console.log({ errorMessage: error.message }));
         }}
      />
   );
}

const CatalogScreen = ({ navigation }) => {
   const [platos, setplatos] = useState([]);
   useEffect(() => {
      setplatos([...data]);
   }, []);

   return (
      <ScrollView>
         {platos.map((plato) => (
            <Card key={plato.id}>
               <Card.Title>{plato.name}</Card.Title>
               <Card.Divider />
               <TouchableOpacity
                  onPress={() => {
                     navigation.navigate("Detail", {
                        platoId: plato.id,
                     });
                  }}
               >
                  <Image style={styles.image} source={{ uri: plato.imageUrl }} />
               </TouchableOpacity>
            </Card>
         ))}
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   image: {
      maxWidth: width,
      height: 220,
   },
});

export { CatalogScreen, MyDrawer };
