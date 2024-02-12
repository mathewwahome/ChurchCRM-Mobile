import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {BASE_URL, fetchDataByEndpoint} from '../../hooks/HandleApis';
import {styles} from '../../assets/css/Global';
import {styles as sermonstyles} from '../../assets/css/SermonsScreen';
const Stack = createStackNavigator();

export const fetchSermons = async () => {
  return fetchDataByEndpoint('fetchSermons');
};

const Sermons = () => {
  const navigation = useNavigation();
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
    <ScrollView>
      <View style={{padding: 10}}>
        <ScrollView>
          {sermonsLoading ? (
            <Text>Loading sermons...</Text>
          ) : sermonsData && sermonsData.length > 0 ? (
            sermonsData.map(sermon => (
              <TouchableOpacity
                key={sermon.id}
                onPress={() =>
                  navigation.navigate('VideoPlayer', {sermon: sermon})
                }>
                <View style={sermonstyles.sermonContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${BASE_URL}/SermonThumbnails/${sermon.Thumbnail}`,
                    }}
                  />
                  <View style={sermonstyles.containertest}>
                    <Text style={styles.text}>
                      {new Date(sermon.created_at).toLocaleDateString(
                        undefined,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </Text>
                    <Text style={sermonstyles.title}>
                      {sermon.Title.slice(0, 40)}...
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No Sermons available</Text>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const SermonsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Sermon" component={Sermons} />
    </Stack.Navigator>
  );
};

export default SermonsStackNavigator;
