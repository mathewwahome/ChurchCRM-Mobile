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
import DocumentViewer from "./navigation/screens/DocumentViewer";
import axios from "axios";
import { View, Text } from "react-native";

const Stack = createStackNavigator();

function App() {
  const [userId, setUserId] = useState(null);
 
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
        <Stack.Screen name="NewNotes" children={() => <NewNotes userId={userId} />} />
        <Stack.Screen name="NewNotes" component={NewNotes} />
        <Stack.Screen name="DocumentViewer" component={DocumentViewer} />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

export default App;
