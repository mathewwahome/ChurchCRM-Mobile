import React, {useEffect, useState} from 'react';
import {srcContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainContainer from './src/MainContainer';
import LandingScreen from './src/LandingScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import ProfileScreen from './src/screens/auth/ProfileScreen';
import SettingScreen from './src/screens/auth/SettingScreen';
import NewNotes from './src/screens/notes/NewNotes';
import DocumentViewer from './src/screens/DocumentViewer';
import axios from 'axios';
import {View, Text} from 'react-native';
import EventsScreen from './src/screens/EventsScreen';

import AnnouncementView from './src/screens/view/AnnouncementView';
import EventView from './src/screens/view/EventView';

import VideoPlayer from './src/screens/view/VideoPlayer';

import SermonNotes from './src/screens/SermonNotes';

const Stack = createStackNavigator();

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingScreen">
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            children={() => <LoginScreen setUserId={setUserId} />}
          />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen
            name="MainContainer"
            children={() => <MainContainer userId={userId} />}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileScreen"
            children={() => <ProfileScreen userId={userId} />}
          />
          <Stack.Screen name="SettingScreen" component={SettingScreen} />
          <Stack.Screen
            name="NewNotes"
            children={() => <NewNotes userId={userId} />}
          />
          <Stack.Screen name="SermonNotes" component={SermonNotes} />

          <Stack.Screen name="DocumentViewer" component={DocumentViewer} />
          <Stack.Screen name="EventsScreen" component={EventsScreen} />
          <Stack.Screen name="AnnouncementView" component={AnnouncementView} />
          <Stack.Screen name="EventView" component={EventView} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
