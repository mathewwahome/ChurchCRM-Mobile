import React, {useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import VerseOfTheDay from '../../screens/VerseOfTheDay/VerseOfTheDay';
import Announcements from '../../screens/ListView/Announcements';
import Sermons from '../../screens/ListView/Sermons';
import SermonsNotes from '../../screens/ListView/SermonNotes';

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
      <VerseOfTheDay data={data.verseOTheDay} />
      <Announcements data={data.announcements} />
      <Sermons data={data.sermons} />
      <SermonsNotes data={data.sermonNotes} />
    </ScrollView>
  );
};

export default Home;
