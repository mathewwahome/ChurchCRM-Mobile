import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {styles} from '../../assets/css/Global';
// import {WebView} from 'react-native-webview';

const VideoPlayer = ({route}) => {
  const {sermon} = route.params;
  const youtubeUrl = 'https://youtu.be/ugzE99frHI8';
  const videoId = extractVideoId(youtubeUrl);

  return (
    <ScrollView style={styles.container}>
      {/* <WebView
        source={{uri: `https://www.youtube.com/embed/${videoId}`}}
        style={{flex: 1}}
      /> */}
      <Text style={styles.text}>
        {new Date(sermon.created_at).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text style={styles.text}>Video ID: {videoId}</Text>
      <Text style={styles.text}>{sermon.Title}</Text>
      <Text style={styles.text}>{sermon.Sermon_Link}</Text>
      <Text style={styles.text}>{sermon.Sermon_Description}</Text>
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
