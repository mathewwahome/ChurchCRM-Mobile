import {
  Platform,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {BASE_URL} from '../../hooks/HandleApis';
import {styles} from '../../assets/css/Global';
import React, {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import SermonNotes from '../ListView/SermonNotes';

const SermonNotesView = ({route}) => {
  const {announcement, imageUri} = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const [sermonNotes, setSermonNotes] = useState([]);

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch updated data or reset data
    //fetchData().then(() => setRefreshing(false));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Function to download sermon notes
  const downloadSermon = async (sermonId, notesFile) => {
    try {
      if (!notesFile) {
        console.error('Sermon notes file is not provided.');
        return;
      }
      const {config, fs} = RNFetchBlob;
      const dir =
        Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;

      // Extracting file extension and MIME type
      const fileExtension = notesFile.split('.').pop();
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

      const filePath = `${dir}/${sermonId}.${fileExtension}`;

      // Configuring download options
      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: announcement.Title,
          path: filePath,
          mime: mimeType,
        },
        useDownloadManager: true,
        notification: true,
        title: announcement.Title,
        path: filePath,
      };

      // Start downloading
      const res = await config(options).fetch(
        'GET',
        `${BASE_URL}/api/download_notes/${sermonId}`,
      );

      // Log success
      console.log('Download success', res);
    } catch (error) {
      // Log any errors
      console.error('Download error', error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Image style={styles.image} source={{uri: imageUri}} />
      <Text style={styles.dataDate}>
        {new Date(announcement.created_at).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text style={styles.dataTopic}>{announcement.Topic}</Text>
      <Text style={styles.text}>{announcement.sermondescription}</Text>
      <TouchableOpacity
        onPress={() =>
          downloadSermon(announcement.id, announcement.Sermon_Notes)
        }
        style={styles.downloadNotesButton}>
        <Text style={styles.downloadNotesText}>Download Notes</Text>
      </TouchableOpacity>
      <SermonNotes />
    </ScrollView>
  );
};

export default SermonNotesView;
