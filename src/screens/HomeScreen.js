import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import VerseOfTheDay from './VerseOfTheDay/VerseOfTheDay';
import Announcements from './ListView/Announcements';
import Sermons from './ListView/Sermons';
import SermonsNotes from './ListView/SermonNotes';

const Stack = createStackNavigator();

export default function HomeScreen({navigation}) {

  return (
    <ScrollView>
      <VerseOfTheDay />
      <Announcements />
      <Sermons />
      <SermonsNotes />
    </ScrollView>
  );
}
