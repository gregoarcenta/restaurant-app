import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Dimensions, Text } from "react-native";
import { Card } from "react-native-elements";
import data from "../database/data.json";

var { width } = Dimensions.get("window");

const PlatoDetail = ({ route }) => {
   const id = route.params.platoId;
   const [plato, setPlato] = useState(null);

   useEffect(() => {
      const platos = [...data];
      const plato = platos.find((plato) => plato.id === id);
      setPlato({ ...plato });
   }, []);

   return (
      <View>
         {plato ? (
            <Card>
               <Card.Title>{plato.name}</Card.Title>
               <Card.Divider />
               <Image style={styles.image} source={{ uri: plato.imageUrl }} />
               <Text style={styles.description}>{plato.description}</Text>
            </Card>
         ) : null}
      </View>
   );
};

const styles = StyleSheet.create({
   image: {
      maxWidth: width,
      minHeight: 250,
      maxHeight: 280,
   },
   description: {
      textAlign: "center",
      fontSize: 30,
      fontWeight: "100",
      marginTop: 10,
   },
});

export default PlatoDetail;
