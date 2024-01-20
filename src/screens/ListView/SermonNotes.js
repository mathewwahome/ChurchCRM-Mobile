import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {BASE_URL, fetchDataByEndpoint} from '../../hooks/HandleApis';

const Stack = createStackNavigator();

export const fetchSermonsNotes = async () => {
  return fetchDataByEndpoint('fetchSermonnotes');
};

export default function SermonsNotes({navigation}) {
  const [sermonsNotesData, setSermonsNotesData] = useState([]);
  const [sermonsNotesLoading, setSermonsNotesLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sermonNotes = await fetchSermonsNotes();
        setSermonsNotesData(sermonNotes);
        setSermonsNotesLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View
      style={styles.sermonNoteContainer}>
      <Text style={styles.sermonNotesHeading}>Sermon Notes</Text>
      <ScrollView horizontal={true}>
        {sermonsNotesLoading ? (
          <Text style={styles.loadingText}>Loading sermon Notes...</Text>
        ) : sermonsNotesData &&
          sermonsNotesData.length > 0 ? (
          sermonsNotesData.map(sermonnotes => (
            <View key={sermonnotes.id}>
              <View style={{flexDirection: 'row', padding: 10}}>
                <View style={{marginRight: 10}}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${BASE_URL}/Notes_Thumbnails/${sermonnotes.notesimage}`,
                    }}
                  />
                  <Text style={styles.sermonDate}>
                    {new Date(sermonnotes.created_at).toLocaleDateString(
                      undefined,
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </Text>
                  <Text style={styles.sermonText}>{sermonnotes.sermondescription}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>No Sermon Notes available</Text>
        )}
      </ScrollView>
    </View>
  );
}
