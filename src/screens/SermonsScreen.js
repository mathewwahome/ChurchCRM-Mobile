import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {styles} from '../assets/css/SermonsScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BASE_URL, fetchDataByEndpoint} from '../hooks/HandleApis';

export default function Sermons({userId}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const url = `${BASE_URL}/api/fetchSermons`;

  useEffect(() => {
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
  }, []);

  // Function to redirect to sermon notes
  const handlePress = (sermonId, userId) => {
    console.log('Navigating with sermonId:', sermonId);
    console.log('Navigating with userId:', userId);
    navigation.navigate('SermonNotes', {sermonId, userId});
  };

  return (
    <ScrollView>
      <View style={{padding: 10}}>
        <ScrollView>
          <View>
            {loading ? (
              <Text>Loading Sermons...</Text>
            ) : (
              data.map(sermon => (
                <View style={styles.itemContainer} key={sermon.id}>
                  <TouchableOpacity onPress={() => handlePress(sermon.id)}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${BASE_URL}/SermonThumbnails/${sermon.Thumbnail}`,
                      }}
                    />
                    <Text style={styles.text}>{sermon.Title}</Text>
                    <Text style={styles.text}>
                      {sermon.Sermon_Description.slice(0, 20)}...
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
