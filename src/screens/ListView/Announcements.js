import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {BASE_URL, fetchDataByEndpoint} from '../../hooks/HandleApis';

const Stack = createStackNavigator();

export const fetchAnnouncements = async () => {
  return fetchDataByEndpoint('fetchAnnouncements');
};

export default function Announcements({navigation}) {
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcements = await fetchAnnouncements();
        setAnnouncementsData(announcements);
        setAnnouncementsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{padding: 10}}>
      <Text style={styles.headingText}>Announcements</Text>

      <ScrollView horizontal={true}>
        {announcementsLoading ? (
          <Text>Loading Announcements...</Text>
        ) : announcementsData && announcementsData.length > 0 ? (
          announcementsData.map(announcements => (
            <TouchableOpacity
              key={announcements.id}
              onPress={() =>
                navigation.navigate('AnnouncementView', {
                  announcement: announcements,
                  imageUri: `${BASE_URL}/Announcements/${announcements.poster}`,
                })
              }>
              <View>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <View style={{marginRight: 10}}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${BASE_URL}/Announcements/${announcements.poster}`,
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
          <Text>Announcements Not available!</Text>
        )}
      </ScrollView>
    </View>
  );
}
