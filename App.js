import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
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
import SermonNotesView from './src/screens/view/SermonNotesView';
import EventView from './src/screens/view/EventView';
import VideoPlayer from './src/screens/view/VideoPlayer';
import SplashScreen from './src/SplashScreen';
import SermonsStackNavigator from './src/navigation/stack-navigators/SermonsStackNavigator';
import VerseOfTheDay from './src/screens/VerseOfTheDay/VerseOfTheDay';
import useAuth from './src/hooks/HandleAuth';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import Notes from './src/screens/Notes';
import EditNotes from './src/screens/notes/EditNotes';
import ViewNote from './src/screens/notes/ViewNote';
function App() {
  const [reloadNotes, setReloadNotes] = useState(false);
  const {getStoredUserData} = useAuth();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserData = await getStoredUserData();
      console.log(storedUserData);

      if (storedUserData && storedUserData.retrieved_userId) {
        setUserId(storedUserData.retrieved_userId);
        // console.log(storedUserData);
      } else {
        setUserId(null);
      }
    };

    fetchUserId();
  }, [getStoredUserData]);

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
                children={() => (
                  <LoginScreen setUserId={setUserId} userId={userId} />
                )}
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
                name="DrawerNavigator"
                children={() => (
                  <DrawerNavigator userId={userId} setUserId={setUserId} />
                )}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProfileScreen"
                children={() => (
                  <ProfileScreen userId={userId} setUserId={setUserId} />
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
                name="Notes"
                children={() => (
                  <Notes
                    userId={userId}
                    setReloadNotes={setReloadNotes}
                    reloadNotes={reloadNotes}
                  />
                )}
                options={{title: 'Notes'}}
              />
              <Stack.Screen
                name="EditNotes"
                component={EditNotes}
                initialParams={{setReloadNotes}}
              />
              <Stack.Screen
                name="ViewNote"
                component={ViewNote}
                options={{
                  title: 'Documents',
                  setReloadNotes: setReloadNotes,
                }}
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
              <Stack.Screen name="VerseOfDayScreen" component={VerseOfTheDay} />
              <Stack.Screen
                name="SermonNotesView"
                component={SermonNotesView}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
