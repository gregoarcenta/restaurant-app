import React, { useState } from "react";
import {
   View,
   ScrollView,
   TextInput,
   StyleSheet,
   Dimensions,
   Button,
   Alert,
   ActivityIndicator,
} from "react-native";
import firebase from "../database/firebase.js";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const RegisterScreen = ({ navigation }) => {
   const [values, setValues] = useState({
      email: "",
      user: "",
      password: "",
   });
   const [isLoading, setLoading] = useState(false);

   function handleChangeText(name, value) {
      setValues({ ...values, [name]: value });
   }

   function registerUser() {
      if (!values.email || !values.password || !values.user) {
         Alert.alert("Uno de los campos es invalido!");
      } else {
         setLoading(true);
         firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((res) => {
               res.user.updateProfile({
                  displayName: values.user,
               });
               console.log("Usuario registrado satisfactoriamente!");
               setLoading(false);
               navigation.navigate("Login");
            })
            .catch((error) => {
               setLoading(false);
               console.log({ errorMessage: error.message });
            });
      }
   }

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.inputGroup1}>
            <TextInput
               placeholder="Ingrese un email"
               style={styles.input}
               onChangeText={(value) => handleChangeText("email", value)}
            />
         </View>
         <View style={styles.inputGroup2}>
            <TextInput
               placeholder="Ingrese un usuario"
               style={styles.input}
               onChangeText={(value) => handleChangeText("user", value)}
            />
         </View>
         <View style={styles.inputGroup2}>
            <TextInput
               placeholder="Ingrese una contraseña"
               style={styles.input}
               onChangeText={(value) => handleChangeText("password", value)}
               secureTextEntry
            />
         </View>
         <View style={styles.inputGroup2}>
            <Button title="Registrarse" onPress={() => registerUser()} />
         </View>
         {isLoading ? (
            <View style={styles.preloader}>
               <ActivityIndicator size="large" color="#111" />
            </View>
         ) : null}
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      height: ScreenHeight,
      width: ScreenWidth,
   },
   image: {
      flex: 1,
      justifyContent: "center",
      paddingLeft: 16,
      paddingRight: 16,
   },
   inputGroup1: {
      marginTop: 0,
   },
   inputGroup2: {
      marginTop: 16,
   },
   input: {
      padding: 12,
      color: "#000",
      backgroundColor: "#fff",
      fontSize: 16,
      borderRadius: 3,
   },
   preloader: {
      top: 50,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
   },
});

export default RegisterScreen;
