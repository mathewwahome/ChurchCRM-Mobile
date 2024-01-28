import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MainContainer from './src/MainContainer';
import LandingScreen from './src/LandingScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import ProfileScreen from './src/screens/auth/ProfileScreen';
import SettingScreen from './src/screens/auth/SettingScreen';
import NewNotes from './src/screens/notes/NewNotes';
import DocumentViewer from './src/screens/DocumentViewer';
import EventsScreen from './src/screens/EventsScreen';
import AnnouncementView from './src/screens/view/AnnouncementView';
import EventView from './src/screens/view/EventView';
import VideoPlayer from './src/screens/view/VideoPlayer';
import SermonNotes from './src/screens/SermonNotes';
import SplashScreen from './src/SplashScreen';
import Notes from './src/screens/Notes';
import SermonsStackNavigator from './src/navigation/stack-navigators/SermonsStackNavigator';
import VerseOfTheDay from './src/screens/VerseOfTheDay/VerseOfTheDay';
function App() {
  const [userId, setUserId] = useState(null);
  const [reloadNotes, setReloadNotes] = useState(false);
  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          {userId == null ? (
            <>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LandingScreen"
                component={LandingScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LoginScreen"
                children={() => <LoginScreen setUserId={setUserId} />}
                options={{title: 'Login'}}
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{title: 'Register'}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{title: 'Reset Password'}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="MainContainer"
                children={() => (
                  <MainContainer
                    userId={userId}
                    reloadNotes={reloadNotes}
                    setReloadNotes={setReloadNotes}
                  />
                )}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProfileScreen"
                children={() => (
                  <ProfileScreen
                    userId={userId}
                    reloadNotes={reloadNotes}
                    setReloadNotes={setReloadNotes}
                  />
                )}
                options={{title: 'Profile'}}
              />
              <Stack.Screen
                name="SettingScreen"
                component={SettingScreen}
                options={{title: 'Settings'}}
              />
              <Stack.Screen
                name="NewNotes"
                children={() => (
                  <NewNotes userId={userId} setReloadNotes={setReloadNotes} />
                )}
                options={{title: 'New Note'}}
              />
              <Stack.Screen
                name="SermonNotes"
                component={SermonNotes}
                options={{title: 'Sermon Notes'}}
              />

              <Stack.Screen
                name="DocumentViewer"
                component={DocumentViewer}
                options={{title: 'Documents'}}
              />
              <Stack.Screen
                name="EventsScreen"
                component={EventsScreen}
                options={{title: 'Events'}}
              />
              <Stack.Screen
                name="AnnouncementView"
                component={AnnouncementView}
                options={{title: 'Announcement'}}
              />
              <Stack.Screen
                name="EventView"
                component={EventView}
                options={{title: 'Event'}}
              />
              <Stack.Screen
                name="VideoPlayer"
                component={VideoPlayer}
                options={{title: 'Video'}}
              />
              <Stack.Screen
                name="SavedSermonsScreen"
                component={SermonsStackNavigator}
                options={{title: 'Sermons'}}
              />
              {/* VerseOfDayScreen */}
              <Stack.Screen
                name="VerseOfDayScreen"
                component={VerseOfTheDay}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
