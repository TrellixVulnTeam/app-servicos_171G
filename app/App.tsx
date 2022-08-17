import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import WelcomeScreen from './src/Welcome';
import LoginScreen from "./src/Login";
import HomeScreen from "./src/Home";
import DetailScreen from "./src/Detail";
import FormInformation from "./src/FormInformation";
import CadUsuarios from "./src/CadUsuarios";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Welcome"
        options={{
          headerShown: false,
        }}
        component={WelcomeScreen}
        />
        <Stack.Screen 
        name="Login"
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={HomeScreen}
        />
        <Stack.Screen 
        name="Detail"
        options={{
          headerShown: false,
        }} 
        component={DetailScreen} />
        <Stack.Screen 
        name="FormInformation" 
        options={{
          headerShown: false,
        }}
        component={FormInformation} />
        <Stack.Screen 
        name="CadUsuarios" 
        options={{
          headerShown: false,
        }}
        component={CadUsuarios} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}