import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainContainer from "./navigation/MainContainer";
import LandingScreen from "./navigation/LandingScreen";
import LoginScreen from "./navigation/screens/auth/LoginScreen";
import SignupScreen from "./navigation/screens/auth/SignupScreen";
import ProfileScreen from "./navigation/screens/auth/ProfileScreen";
import SettingScreen from "./navigation/screens/auth/SettingScreen";
import axios from "axios";
import { View, Text } from "react-native";

const Stack = createStackNavigator();

function App() {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const url = "https://ynetsolution.com/revision/api/fetch-data";

  // useEffect(() => {
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       // You can handle the error state or show a user-friendly message here
  //     });
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen name="LandingScreen" component={LandingScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="MainContainer" component={MainContainer}  options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View>
    //   {data.map((post) => (
    //     <View>
    //       <Text style={{ fontSize: 20 }}>{post.name}</Text>
    //       <Text style={{ color: "blue" }}>{post.email}</Text>
    //     </View>
    //   ))}
    // </View>
  );
}

export default App;
