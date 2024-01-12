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
  generateUrl,
  sermonsUrl,
  sermonNotesUrl,
  announcementsUrl,
} from '../hooks/HandleApis';

const Stack = createStackNavigator();

export default function HomeScreen({navigation}) {
  const [sermonsData, setSermonsData] = useState([]);
  const [sermonNotesData, setSermonNotesData] = useState([]);

  const [AnnouncementsData, setAnnouncementsData] = useState([]);

  const [sermonsLoading, setSermonsLoading] = useState(true);
  const [sermonNotesLoading, setsermonNotesLoading] = useState(true);

  const [AnnouncementsLoading, setAnnouncementsLoading] = useState(true);

  const [verseData, setVerseData] = useState({citation: '', passage: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerseOfTheDay = async () => {
      try {
        const verse = await getVerseOfTheDay();
        setVerseData(verse);
      } catch (error) {
        console.error('Error fetching verse:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerseOfTheDay();
  }, []);

  const fetchData = (url, setData, setLoading) => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching data from ${url}:`, error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(sermonsUrl, setSermonsData, setSermonsLoading);
    fetchData(sermonNotesUrl, setSermonNotesData, setsermonNotesLoading);
    fetchData(announcementsUrl, setAnnouncementsData, setAnnouncementsLoading);
  }, []);

  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.view}>
          {loading ? (
            <Text style={styles.loadingText}>Verse of the day loading...</Text>
          ) : (
            <>
              <Text style={styles.TextStyle}>{verseData.passage}</Text>
              <Text style={{fontSize: 18, fontWeight: '700', marginTop: 30}}>
                {verseData.citation}
              </Text>
            </>
          )}
        </View>
      </ImageBackground>

      <View style={{padding: 10}}>
        <Text style={styles.headingText}>Announcements</Text>

        <ScrollView horizontal={true}>
          {AnnouncementsLoading ? (
            <Text>Loading Announcements...</Text>
          ) : (
            AnnouncementsData.map(announcements => (
              <TouchableOpacity
                key={announcements.id}
                onPress={() =>
                  navigation.navigate('AnnouncementView', {
                    announcement: announcements,
                    imageUri: `${FILe_BASE}Announcements/${announcements.poster}`,
                  })
                }>
                <View>
                  <View style={{flexDirection: 'row', padding: 10}}>
                    <View style={{marginRight: 10}}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: `${FILe_BASE}Announcements/${announcements.poster}`,
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
          )}
        </ScrollView>
        <Text style={styles.headingText}>Sermons</Text>
        <ScrollView horizontal={true}>
          {sermonsLoading ? (
            <Text>Loading sermons...</Text>
          ) : (
            sermonsData.map(sermon => (
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
                          uri: `${FILe_BASE}SermonThumbnails/${sermon.Thumbnail}`,
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
          {sermonNotesLoading ? (
            <Text>Loading sermon Notes...</Text>
          ) : (
            sermonNotesData.map(sermonnotes => (
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
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
