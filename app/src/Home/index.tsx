import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { categories } from './categories';

export interface IMarker {
    category: string;
    contact: string;
    description: string;
    id: string;
    latitude: number,
    longitude: number,
    name: string;
}

export default function Home() {

    const [markers, setMarkers] = useState<IMarker[]>([]);
    const [filter, setFilter] = useState("");
    const navigation = useNavigation();
    const filteredData = markers.filter((m) => m.category === filter);

    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        fetch("http://192.168.15.82:3000/store").then(async (request) => {
            const data = await request.json();

            setMarkers(data);
        });
    }, []);

    if (!markers || markers.length === 0) {
        return <ActivityIndicator />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Bem vindo</Text>
                <Text style={styles.subTitle}>
                    Encontre no mapa um ponto do comércio local
                </Text>
            </View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.42597730214824,
                    longitude: -122.0856026405,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  showsUserLocation={true}
                  loadingEnabled
                  mapType="hybrid"
            >
                {(filter ? filteredData : markers).map((item) => {
                    return (
                        <Marker
                            key={item.id}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                            }}
                            onPress={() => {
                                navigation.navigate("Detail", item);
                            }}
                        />
                    );
                })}
            </MapView>

            <View style={styles.categoryContainer}>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    contentContainerStyle={{
                        alignItems: "center",
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setFilter(filter === item.key ? "" : item.key);
                            }}
                            style={[
                                styles.categoryItem,
                                filter === item.key ? styles.selectedCategory : null,
                            ]}
                            key={item.key}
                        >
                            <Image style={styles.categoryImage} source={item.image} />
                            <Text style={styles.categoryText}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        padding: 20,
        paddingTop: Platform.OS === "android" ? 50 : 0,
    },
    title: {
        fontSize: 24,
        fontWeight: "400",
        color: "#322153",
    },
    subTitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "#6c6c80",
    },
    map: {
        flex: 1,
    },
    categoryContainer: {
        padding: 10,
    },
    categoryItem: {
        height: 110,
        backgroundColor: "#f0f0f5",
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    categoryImage: {
        width: 50,
        height: 50,
    },
    categoryText: {
        textAlign: "center",
        color: "#6c6c80",
    },
    selectedCategory: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#322153",
    },
});