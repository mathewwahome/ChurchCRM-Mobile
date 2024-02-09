import {
  Platform,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { BASE_URL, fetchDataByEndpoint } from '../../hooks/HandleApis';
import { styles } from '../../assets/css/Global';
import { styles as homestyles } from '../../assets/css/HomeScreen';
import React, { useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { useEffect } from 'react';
export const fetchSermonsNotes = async (note_id) => {
  return fetchDataByEndpoint(`fetch_other_notes/${note_id}`);
};

const SermonNotesView = ({ route }) => {
  const { sermon_note, imageUri, sermon_note_id } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [sermonsNotesLoading, setSermonsNotesLoading] = useState(true);
  const [sermonsNotesData, setSermonsNotesData] = useState([]);




  const onRefresh = () => {
    setRefreshing(true);
    // Fetch updated data or reset data
    //fetchData().then(() => setRefreshing(false));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Function to download sermon notes
  const downloadSermon = async (noteID, notesFile) => {
    try {
      if (!notesFile) {
        console.error('Sermon notes file is not provided.');
        return;
      }
      console.log("Notes file", notesFile)
      const { config, fs } = RNFetchBlob;
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

      const filePath = `${dir}/${noteID}.${fileExtension}`;

      // Configuring download options
      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'Sermon Notes',
          path: filePath,
          mime: mimeType,
        },
        useDownloadManager: true,
        notification: true,
        title: 'Sermon Notes',
        path: filePath,
      };

      // Start downloading
      const res = await config(options).fetch(
        'GET',
        `${BASE_URL}/api/download_sermon_notes/${noteID}`,
      );

      // Log success
      console.log('Download success', res);
    } catch (error) {
      // Log any errors
      console.error('Download error', error);
    }
  };

  // Fetch other notes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sermonNotes = await fetchSermonsNotes(sermon_note_id);
        setSermonsNotesData(sermonNotes);
        setSermonsNotesLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Image style={styles.itemImage} source={{ uri: imageUri }} />
      <Text style={styles.dataDate}>
        {new Date(sermon_note.created_at).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text style={styles.dataTopic}>Description</Text>
      <Text style={styles.dataTopic}>{sermon_note.Topic}</Text>
      <Text style={styles.text}>{sermon_note.sermondescription}</Text>
      <TouchableOpacity
        onPress={() =>
          downloadSermon(sermon_note_id, sermon_note.notesupload)
        }
        style={styles.downloadNotesButton}>
        <Text style={styles.downloadNotesText}>Download Notes</Text>

      </TouchableOpacity>

      {/* Sermon note scroll container */}
      <View style={homestyles.sermonNoteContainer}>
        <Text style={homestyles.sermonNotesHeading}>Sermon Notes</Text>
        <ScrollView horizontal={true}>
          {sermonsNotesLoading ? (
            <Text style={homestyles.loadingText}>Loading sermon Notes...</Text>
          ) : sermonsNotesData && sermonsNotesData.length > 0 ? (
            sermonsNotesData.map(sermonnotes => (
              <TouchableOpacity
                key={sermonnotes.id}
                onPress={() =>
                  navigation.navigate('SermonNotesView', {
                    sermon_note: sermonnotes,
                    imageUri: `${BASE_URL}/Notes_Thumbnails/${sermonnotes.notesimage}`,
                    sermon_note_id: sermonnotes.id
                  })
                }>
                <View key={sermonnotes.id}>
                  <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View style={{ marginRight: 10 }}>
                      <Image
                        style={homestyles.image}
                        source={{
                          uri: `${BASE_URL}/Notes_Thumbnails/${sermonnotes.notesimage}`,
                        }}
                      />
                      <Text style={homestyles.sermonDate}>
                        {new Date(sermonnotes.created_at).toLocaleDateString(
                          undefined,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </Text>
                      <Text style={homestyles.sermonText}>
                        {sermonnotes.sermondescription.length > 25 ?
                          (sermonnotes.sermondescription.slice(0, 25) + '...') :
                          (sermonnotes.sermondescription)
                        }

                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={homestyles.loadingText}>No Sermon Notes available</Text>
          )}
        </ScrollView>
      </View>
    </ScrollView>

  );
};

export default SermonNotesView;
