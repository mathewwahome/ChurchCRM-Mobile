import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainContainer from "./navigation/MainContainer";
import LandingScreen from "./navigation/LandingScreen";
import LoginScreen from "./navigation/screens/auth/LoginScreen";
import SignupScreen from "./navigation/screens/auth/SignupScreen";
import ProfileScreen from "./navigation/screens/auth/ProfileScreen";
import SettingScreen from "./navigation/screens/auth/SettingScreen";
import NewNotes from "./navigation/screens/notes/NewNotes";
import axios from "axios";
import { View, Text } from "react-native";

const Stack = createStackNavigator();

function App() {
  const [userId, setUserId] = useState(null);
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const url = "https://b73c-197-232-61-219.ngrok-free.app/api/fetchEvents";

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
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginScreen" children={() => <LoginScreen setUserId={setUserId}/>} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="MainContainer" children={() => <MainContainer userId={userId} />} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" children={() => <ProfileScreen userId={userId} />} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="NewNotes" component={NewNotes} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View>
    //   {data.map((post) => (
    //     <View>
    //       <Text style={{ fontSize: 20 }}>Event Id = {post.id}</Text>
    //       <Text style={{ color: "blue" }}>Event Title = {post.Event_Title}</Text>
    //       <Text style={{ color: "blue" }}>Event Date = {post.Event_Date}</Text>
    //       <Text style={{ color: "blue" }}>Event Description = {post.Event_Description}</Text>
    //     </View>
    //   ))}
    // </View>
  );
}

export default App;
