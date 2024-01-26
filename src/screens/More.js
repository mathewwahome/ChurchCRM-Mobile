import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../assets/css/MoreScreen';
import {BASE_URL} from '../hooks/HandleApis';

const menuItems = [
  {iconName: 'book', text: 'Saved Sermons', screenName: 'SavedSermonsScreen'},
  {
    iconName: 'bookmarks',
    text: 'Verse of the Day',
    screenName: 'VerseOfDayScreen',
  },
  {iconName: 'note', text: 'Notes', screenName: 'NotesScreen'},
  {iconName: 'event', text: 'Events', screenName: 'EventsScreen'},
  {iconName: 'share', text: 'Share App', screenName: 'ShareAppScreen'},
  {iconName: 'info', text: 'About App', screenName: 'AboutAppScreen'},
  {
    iconName: 'person',
    text: 'Church Websites',
    screenName: 'ChurchWebsitesScreen',
  },
  {iconName: 'settings', text: 'Settings', screenName: 'SettingScreen'},
  {iconName: 'person', text: 'Profile Screen', screenName: 'ProfileScreen'},
];

export default function More({route}) {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const {userId, setUserId} = route.params;

  useEffect(() => {
    if (userId) {
      fetch(`${BASE_URL}/api/profile/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          setUserId(setUserId);
          // console.log('User Data:', data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [setUserId, userId]);

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const renderMenuItem = ({iconName, text, screenName}) => {
    return (
      <TouchableOpacity
        key={screenName}
        onPress={() => navigateToScreen(screenName)}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} style={styles.icon} />
          <Text style={styles.linktext}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.MoreContainer}>
          <View style={styles.itemContainer}>
            <Image
              source={require('../assets/images/one.jpg')}
              style={styles.image_logo}
            />
          </View>
          <Text style={styles.username}>
            {data.name} <Icon name="person" style={styles.icon} />{' '}
          </Text>
        </View>

        <View style={styles.container}>
          {menuItems.map(item => renderMenuItem(item))}
        </View>
      </View>
    </ScrollView>
  );
}
