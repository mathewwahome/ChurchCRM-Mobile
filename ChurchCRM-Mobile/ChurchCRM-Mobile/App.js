import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './navigation/MainContainer';
import LandingScreen from './navigation/LandingScreen';
import LoginScreen from './navigation/screens/auth/LoginScreen';
import SignupScreen from './navigation/screens/auth/SignupScreen';

import ProfileScreen from './navigation/screens/auth/ProfileScreen';
import SettingScreen from './navigation/screens/auth/SettingScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="MainContainer" component={MainContainer} />

        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>

    // <MainContainer />
  )
}

export default App;