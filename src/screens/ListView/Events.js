import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/EventsScreen';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL, fetchDataByEndpoint} from '../../hooks/HandleApis';

// const Stack = createStackNavigator();

export const fetchEvents = async () => {
  return fetchDataByEndpoint('fetchEvents');
};

export default function Events() {
  const [eventData, setEventsData] = useState([]);
  const [eventLoading, setEventLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await fetchEvents();
        setEventsData(events);
        setEventLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={{padding: 10}}>
      <ScrollView>
        {eventLoading ? (
          <Text>Loading Events...</Text>
        ) : eventData && eventData.length > 0 ? (
          eventData.reduce((rows, event, index) => {
            if (index % 2 === 0) {
              rows.push(
                <View
                  style={{flexDirection: 'row', marginBottom: 10}}
                  key={index}>
                  {eventData.slice(index, index + 2).map(events => (
                    <TouchableOpacity
                      key={events.id}
                      onPress={() =>
                        navigation.navigate('EventView', {
                          event: events,
                          imageUri: `${BASE_URL}/EventImages/${events.Img_Path}`,
                        })
                      }
                      style={{flex: 1, marginRight: 10}}>
                      <View style={{padding: 10}}>
                        <Image
                          style={styles.image}
                          source={{
                            uri: `${BASE_URL}/EventImages/${events.Img_Path}`,
                          }}
                        />
                        <Text>
                          {new Date(events.Event_Date).toLocaleDateString(
                            undefined,
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            },
                          )}
                        </Text>
                        <Text style={styles.text}>{events.Event_Title}</Text>
                        <Text style={styles.text}>
                          {events.Event_Description.slice(0, 15)}...
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>,
              );
            }
            return rows;
          }, [])
        ) : (
          <Text>Events Not available!</Text>
        )}
      </ScrollView>
    </View>
  );
}
