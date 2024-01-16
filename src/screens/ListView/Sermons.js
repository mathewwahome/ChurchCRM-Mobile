import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {BASE_URL, fetchDataByEndpoint} from '../../hooks/HandleApis';

// const Stack = createStackNavigator();

export const fetchSermons = async () => {
  return fetchDataByEndpoint('fetchSermons');
};

export default function Sermons() {
  const [sermonsData, setSermonsData] = useState([]);
  const [sermonsLoading, setSermonsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sermons = await fetchSermons();
        setSermonsData(sermons);
        setSermonsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{padding: 10}}>
      <Text style={styles.headingText}>Sermons</Text>
      <ScrollView horizontal={true}>
        {sermonsLoading ? (
          <Text>Loading sermons...</Text>
        ) : sermonsData && sermonsData.length > 0 ? (
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
                        uri: `${BASE_URL}/SermonThumbnails/${sermon.Thumbnail}`,
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
  );
}
