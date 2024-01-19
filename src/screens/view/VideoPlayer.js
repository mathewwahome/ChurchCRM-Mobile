import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {styles} from '../../assets/css/Global';
import YoutubePlayer from 'react-native-youtube-iframe';
const VideoPlayer = ({route}) => {
  const {sermon} = route.params;
  const videoId = extractVideoId(sermon.Sermon_Link);

  return (
    <ScrollView style={styles.container}>
      <View>
        <YoutubePlayer height={250} play={false} videoId={videoId} />
      </View>
      <View>
        <Text style={styles.text}>
          {new Date(sermon.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'black'}} />

        <Text style={{...styles.title, marginBottom: 20, marginTop: 10}}>
          {sermon.Title}
        </Text>

        <Text style={styles.text}>{sermon.Sermon_Description}</Text>
      </View>
    </ScrollView>
  );
};
const extractVideoId = url => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
};
export default VideoPlayer;
