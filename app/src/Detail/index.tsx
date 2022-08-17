import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable'
import { IMarker } from "../Home";

type DetailRoute = RouteProp<{ detail: IMarker }, "detail">;

export default function Detail() {

  const { params } = useRoute<DetailRoute>();
  const [address, setAddres] = useState<any>();
  const navigation = useNavigation();
  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${params.latitude}&lon=${params.longitude}&format=json`
    ).then(async (request) => {
      const data = await request.json();

      setAddres(data);
      navigation.setOptions({
        title: params.name,
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View
        animation='fadeInLeft'
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.title}>{params.name}</Text>
        <Text style={styles.subTitle}>{params.description}</Text>
      </Animatable.View>
      <Animatable.View
        animation='fadeInLeft'
        delay={500}
        style={styles.containerInfo}
      >
        <Text style={styles.textTitle}>Endereço</Text>
        <Text style={styles.text}>{address?.address.road}</Text>
        <Text style={styles.text}>{address?.address.city}</Text>
        <Text style={styles.text}>{address?.address.postcode}</Text>
        <Text style={styles.text}>{address?.address.state}</Text>
      </Animatable.View>
      <Animatable.View
        animation='fadeInLeft'
        delay={500}
        style={styles.containerInfo}
      >
        <Text style={styles.textTitle}>Contato</Text>
        <Text style={styles.text}>{params.contact}</Text>
      </Animatable.View>
      <Animatable.View
        animation='fadeInUp'
        delay={500}
        style={styles.containerHeader}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FormInformation')}
        >
          <Text style={styles.buttonText}>Enviar informações</Text>
        </TouchableOpacity>
      </Animatable.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    textAlign: 'center',
    color: '#fff'
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 6,
    textAlign: 'center',
    color: '#fff'
  },
  containerInfo: {
    marginBottom: '8%',
    paddingStart: '5%'
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '2%'
  },
  text: {
    fontSize: 14,
    color: '#e3e3e3'
  },
  button: {
    position: 'absolute',
    backgroundColor: '#e3e3e3',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
},
buttonText: {
    fontSize: 18,
    color: '#38a69d',
    fontWeight: 'bold'
}
});