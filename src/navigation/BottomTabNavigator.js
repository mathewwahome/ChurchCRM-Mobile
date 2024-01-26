import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStackNavigator from './stack-navigators/HomeStackNavigator';
import SermonsStackNavigator from './stack-navigators/SermonsStackNavigator';
import EventsScreen from '../screens/EventsScreen';
import Notes from '../screens/Notes';

const Home = 'Home';
const Sermons = 'Sermons';
const notes = 'Notes';
const more = 'More';
const events = 'Events';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({userId, reloadNotes, setReloadNotes}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === Home) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === Sermons) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === notes) {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (rn === events) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (rn === more) {
            iconName = focused
              ? 'ellipsis-horizontal'
              : 'ellipsis-horizontal-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        labelStyle: {
          paddingBottom: 10,
          fontSize: 10,
        },
        style: {
          padding: 10,
          height: 70,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{tabBarVisible: false}}
      />

      <Tab.Screen
        name="Sermons"
        component={SermonsStackNavigator}
        options={{tabBarVisible: false}}
      />
      <Tab.Screen
        name="Notes"
        children={() => (
          <Notes
            userId={userId}
            reloadNotes={reloadNotes}
            setReloadNotes={setReloadNotes}
          />
        )}
        options={{tabBarVisible: false}}
      />

      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{tabBarVisible: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
