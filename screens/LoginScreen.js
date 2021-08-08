import React, { useState } from "react";
import {
   View,
   Text,
   StyleSheet,
   TextInput,
   Button,
   ImageBackground,
   Alert,
   Dimensions,
   ActivityIndicator,
} from "react-native";
import imageBack from "../assets/res-fondo.jpg";
import firebase from "../database/firebase.js";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const LoginScreen = ({ navigation }) => {
   const [values, setvalues] = useState({
      email: "",
      password: "",
   });
   const [isLoading, setLoading] = useState(false);

   function handleChangeText(name, value) {
      setvalues({ ...values, [name]: value });
   }

   function userLogin() {
      if (!values.email || !values.password) {
         Alert.alert("Uno de los campos es invalido");
      } else {
         setLoading(true);
         firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then((res) => {
               console.log(res);
               console.log("Haz iniciado sesion satisfactoriamente");
               setLoading(false);
               navigation.navigate("Catalogo");
            })
            .catch((error) => {
               setLoading(false);
               console.log({ errorMessage: error.message });
            });
      }
   }

   return (
      <View style={styles.container}>
         <View style={styles.titleContainer}>
            <Text style={styles.title}>RESTAURANT LOS CASTROS</Text>
         </View>
         <ImageBackground
            source={imageBack}
            style={styles.image}
            resizeMode="cover"
         ></ImageBackground>
         <View style={styles.containerInputs}>
            <View style={styles.inputGroup1}>
               <TextInput
                  style={styles.input}
                  placeholder="Correo electronico"
                  placeholderTextColor="#000"
                  autoFocus={true}
                  onChangeText={(value) => handleChangeText("email", value)}
               />
            </View>
            <View style={styles.inputGroup2}>
               <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  placeholderTextColor="#000"
                  secureTextEntry
                  onChangeText={(value) => handleChangeText("password", value)}
               />
            </View>
            <View style={styles.inputGroup2}>
               <Button
                  title="Iniciar Sesión"
                  accessibilityLabel="Inicio de seción"
                  onPress={() => userLogin()}
               />
            </View>
            <View style={styles.label}>
               <Text style={styles.label}>
                  No tienes cuenta?
                  <Text
                     style={styles.label}
                     onPress={() => navigation.navigate("Register")}
                  >
                     {" "}
                     Registrate aquí!
                  </Text>
               </Text>
            </View>
            {isLoading ? (
               <View style={styles.preloader}>
                  <ActivityIndicator size="large" color="#fff" />
               </View>
            ) : null}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      padding: 0,
      height: ScreenHeight,
      width: ScreenWidth,
      backgroundColor: "#111",
   },
   containerInputs: {
      paddingLeft: 20,
      paddingRight: 20,
      position: "absolute",
      width: ScreenWidth,
      zIndex: 9999,
   },
   titleContainer: {
      zIndex: 999,
      top: 0,
      position: "absolute",
   },
   title: {
      marginTop: 20,
      textAlign: "center",
      width: ScreenWidth,
      fontSize: 40,
      color: "#fff",
      fontWeight: "700",
   },
   image: {
      flex: 1,
      justifyContent: "center",
      paddingLeft: 16,
      paddingRight: 16,
      opacity: 0.5,
   },
   inputGroup1: {
      marginTop: 0,
   },
   inputGroup2: {
      marginTop: 18,
   },
   input: {
      padding: 12,
      color: "#000",
      backgroundColor: "#fff",
      fontSize: 16,
      borderRadius: 3,
   },
   labelGroup: {
      padding: 10,
      alignSelf: "flex-end",
      justifyContent: "flex-end",
   },
   label: {
      fontSize: 16,
      padding: 6,
      fontWeight: "700",
      color: "#fff",
   },
   preloader: {
      top: 30,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
   },
});

export default LoginScreen;
