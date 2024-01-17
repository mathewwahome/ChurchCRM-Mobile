import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {styles} from '../../assets/css/Global';
const AnnouncementView = ({route}) => {
  const {announcement, imageUri} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{uri: imageUri}} />

      <Text style={styles.text}>
        {new Date(announcement.created_at).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text style={styles.text}>{announcement.Topic}</Text>
      <Text style={styles.text}>{announcement.Message}</Text>
    </ScrollView>
  );
};

export default AnnouncementView;
