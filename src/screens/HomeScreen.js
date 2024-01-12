import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../assets/css/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getVerseOfTheDay} from '../hooks/verseOfTheDay';
import {
  URL,
  FILE_BASE,
  sermonsUrl,
  sermonNotesUrl,
  announcementsUrl,
} from '../hooks/HandleApis';

const Stack = createStackNavigator();

export default function HomeScreen({navigation}) {
  const [data, setData] = useState({
    sermons: [],
    sermonNotes: [],
    announcements: [],
    sermonsLoading: true,
    sermonNotesLoading: true,
    announcementsLoading: true,
    loading: true,
  });

  const [verseData, setVerseData] = useState({
    verse: {citation: '', passage: ''},
    loading: true,
  });

  useEffect(() => {
    const fetchData = (URL, key, setLoading) => {
      fetch(URL)
        .then(response => response.json())
        .then(json => {
          setData(prevData => ({...prevData, [key]: json}));
          setLoading(false);
        })
        .catch(error => {
          console.error(`Error fetching data from ${URL}:`, error);
          setLoading(false);
        });
    };

    const fetchAllData = async () => {
      try {
        const verse = await getVerseOfTheDay();
        setVerseData(prevData => ({...prevData, verse}));
      } catch (error) {
        console.error('Error fetching verse:', error);
      } finally {
        setVerseData(prevData => ({...prevData, loading: false}));
      }

      fetchData(sermonsUrl, 'sermons', setData);
      fetchData(sermonNotesUrl, 'sermonNotes', setData);
      fetchData(announcementsUrl, 'announcements', setData);
    };

    fetchAllData();
  }, []);

  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.view}>
          {verseData.loading ? (
            <Text style={styles.loadingText}>Verse of the day loading...</Text>
          ) : (
            <>
              {verseData.verse && verseData.verse.passage ? (
                <>
                  <Text style={styles.TextStyle}>
                    {verseData.verse.passage}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      marginTop: 30,
                    }}>
                    {verseData.verse.citation}
                  </Text>
                </>
              ) : (
                <Text style={styles.loadingText}>Verse not available</Text>
              )}
            </>
          )}
        </View>
      </ImageBackground>

      <View style={{padding: 10}}>
        <Text style={styles.headingText}>Announcements</Text>
        <ScrollView horizontal={true}>
          {data.announcementsLoading ? (
            <Text>Loading Announcements...</Text>
          ) : data.announcements && data.announcements.length > 0 ? (
            data.announcements.map(announcements => (
              <TouchableOpacity
                key={announcements.id}
                onPress={() =>
                  navigation.navigate('AnnouncementView', {
                    announcement: announcements,
                    imageUri: `${FILE_BASE}Announcements/${announcements.poster}`,
                  })
                }>
                <View>
                  <View style={{flexDirection: 'row', padding: 10}}>
                    <View style={{marginRight: 10}}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: `${FILE_BASE}Announcements/${announcements.poster}`,
                        }}
                      />
                      <Text>
                        {new Date(announcements.created_at).toLocaleDateString(
                          undefined,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </Text>
                      <Text>{announcements.Topic}</Text>
                      <Text>{announcements.Message}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No announcements available</Text>
          )}
        </ScrollView>

        <Text style={styles.headingText}>Sermons</Text>
        <ScrollView horizontal={true}>
          {data.sermonsLoading ? (
            <Text>Loading sermons...</Text>
          ) : data.sermons && data.sermons.length > 0 ? (
            data.sermons.map(sermon => (
              <TouchableOpacity
                key={sermon.id}
                onPress={() =>
                  navigation.navigate('VideoPlayer', {sermon: sermon})
                }>
                <View>
                  <View style={{flexDirection: 'row', padding: 10}}>
                    <View style={{marginRight: 10}}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: `${FILE_BASE}SermonThumbnails/${sermon.Thumbnail}`,
                        }}
                      />
                      <Text>
                        {new Date(sermon.created_at).toLocaleDateString(
                          undefined,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </Text>
                      <Text>{sermon.Thumbnail}</Text>
                      <Text>{sermon.Message}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No Sermons available</Text>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          padding: 10,
          backgroundColor: '#48A6F9',
        }}>
        <Text style={styles.headingText}>Sermon Notes</Text>
        <ScrollView horizontal={true}>
          {data.sermonNotesLoading ? (
            <Text>Loading sermon Notes...</Text>
          ) : data.sermonNotes && data.sermonNotes.length > 0 ? (
            data.sermonNotes.map(sermonnotes => (
              <View key={sermonnotes.id}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <View style={{marginRight: 10}}>
                    <Image
                      style={styles.image}
                      source={require('../assets/images/one.jpg')}
                    />
                    <Text>
                      {new Date(sermonnotes.created_at).toLocaleDateString(
                        undefined,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </Text>
                    <Text>{sermonnotes.Topic}</Text>
                    <Text>{sermonnotes.notesupload}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text>No Sermon Notes available</Text>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
