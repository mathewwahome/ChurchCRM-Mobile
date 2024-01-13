import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {FILE_BASE, HandleDataLoading} from '../../hooks/HandleApis';

const Stack = createStackNavigator();

export default function Sermons({navigation}) {
  const handleDataLoading = HandleDataLoading();

  return (
    <View style={{padding: 10}}>
      <Text style={styles.headingText}>Sermons</Text>
      <ScrollView horizontal={true}>
        {handleDataLoading.data.sermonsLoading ? (
          <Text>Loading sermons...</Text>
        ) : handleDataLoading.data.sermons &&
          handleDataLoading.data.sermons.length > 0 ? (
          handleDataLoading.data.sermons.map(sermon => (
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
  );
}
