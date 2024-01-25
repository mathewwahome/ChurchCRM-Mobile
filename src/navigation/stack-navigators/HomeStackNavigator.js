import React, {useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import VerseOfTheDay from '../../screens/VerseOfTheDay/VerseOfTheDay';
import Announcements from '../../screens/ListView/Announcements';
import Sermons from '../../screens/ListView/Sermons';
import SermonsNotes from '../../screens/ListView/SermonNotes';

const Stack = createStackNavigator();

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    verseOfTheDay: {},
    announcements: [],
    sermons: [],
    sermonNotes: [],
  });

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        verseOfTheDay: {},
        announcements: [],
        sermons: [],
        sermonNotes: [],
      });

      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <VerseOfTheDay data={data.verseOfTheDay} />
      <Announcements data={data.announcements} />
      <Sermons data={data.sermons} />
      <SermonsNotes data={data.sermonNotes} />
    </ScrollView>
  );
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
