import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, RefreshControl} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import VerseOfTheDay from './VerseOfTheDay/VerseOfTheDay';
import Announcements from './ListView/Announcements';
import Sermons from './ListView/Sermons';
import SermonsNotes from './ListView/SermonNotes';

const Stack = createStackNavigator();

export default function HomeScreen({navigation}) {
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
      {/* <Sermons data={data.sermons} />
      <SermonsNotes data={data.sermonNotes} /> */}
    </ScrollView>
  );
}
