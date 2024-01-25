import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {styles} from '../../assets/css/Global';
import YoutubePlayer from 'react-native-youtube-iframe';
import RNFetchBlob from 'rn-fetch-blob';
import {BASE_URL} from '../../hooks/HandleApis';

const VideoPlayer = ({route}) => {
  const {sermon} = route.params;
  const videoId = extractVideoId(sermon.Sermon_Link);

  const downloadSermon = async (sermonId, notesFile) => {
    const {config, fs} = RNFetchBlob;
    console.log('Download in progress...');
    const dir =
      Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;

    const splitFileName = notesFile.split('.');
    const fileExtension = splitFileName[splitFileName.length - 1];
    let mimeType = '';

    switch (fileExtension) {
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      case 'doc':
        mimeType = 'application/msword';
        break;
      case 'docx':
        mimeType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'ppt':
        mimeType = 'application/vnd.ms-powerpoint';
        break;
      case 'pptx':
        mimeType =
          'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      default:
        mimeType = 'application/octet-stream';
    }

    console.log('File Extension:', fileExtension);

    return Platform.select({
      android: config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${dir}/${Math.random()}/${sermon.Title}.${fileExtension}`,
          mime: mimeType,
        },
      }),
      ios: {
        fileCache: config.fileCache,
        title: config.title,
        path: config.path,
        appendExt: fileExtension,
        mime: mimeType,
      },
    })
      .fetch('GET', `${BASE_URL}/api/download_notes/${sermonId}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

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

        <Text style={styles.title}>{sermon.Title}</Text>

        <Text style={styles.text}>{sermon.Sermon_Description}</Text>

        <TouchableOpacity
          onPress={() => downloadSermon(sermon.id, sermon.Sermon_Notes)}
          style={styles.downloadNotesButton}>
          <Text style={styles.downloadNotesText}>Download Notes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const extractVideoId = url => {
  const youtubeRegex =
    /^(?:(?:(?:https?:)?\/\/)?(?:www\.)?)?(?:(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))(?:[?&][\S]*)?$/;

  const match = url.match(youtubeRegex);

  if (match) {
    return match[4];
  }

  return null;
};
export default VideoPlayer;
