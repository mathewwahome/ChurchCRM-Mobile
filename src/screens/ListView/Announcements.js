import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {FILE_BASE, HandleDataLoading} from '../../hooks/HandleApis';

const Stack = createStackNavigator();

export default function Announcements({navigation}) {
  const handleDataLoading = HandleDataLoading();

  return (
    <View style={{padding: 10}}>
      <Text style={styles.headingText}>Announcements</Text>
      <ScrollView horizontal={true}>
        {handleDataLoading.data.announcementsLoading ? (
          <Text>Loading Announcements...</Text>
        ) : handleDataLoading.data.announcements &&
          handleDataLoading.data.announcements.length > 0 ? (
          handleDataLoading.data.announcements.map(announcements => (
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
    </View>
  );
}
