import * as React from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../assets/css/styles';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../hooks/HandleApis';
import GlobalCss from '../assets/css/GlobalCss';
import moment from 'moment';
export default function Notes({userId, reloadNotes, setReloadNotes}) {
  const navigation = useNavigation();
  console.log(userId);
  const NewNoteScreen = () => {
    console.log('handleMain executed');
    navigation.navigate('NewNotes');
  };

  const editNoteScreen = noteId => {
    navigation.navigate('ViewNote', {noteId});
  };

  const [data, setData] = useState({});

  useEffect(() => {
    const handleReload = () => {
      if (reloadNotes) {
        fetchData();
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/showNotes/${userId}`);

        if (response.data && !response.data.error) {
          setData(response.data);
        } else {
          console.log('Error displaying notes.');
        }
      } catch (error) {
        console.error('Displaying notes failed:', error);
      }
    };

    fetchData();
  }, [reloadNotes, userId]);

  return (
    <View>
      <TouchableOpacity onPress={NewNoteScreen} style={styles.touchableOpacity}>
        <Text style={styles.notesTitle}>
          <Icon name="note-add" size={19} /> NEW NOTE
        </Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={GlobalCss.container}>
          <ScrollView horizontal={false}>
            <View style={styles.rowContainer}>
              {data.length > 0 ? (
                data.map(notes => (
                  <TouchableOpacity
                    key={notes.id}
                    onPress={() => editNoteScreen(notes.id)}
                    style={[
                      styles.notesContainer,
                      {
                        backgroundColor: '#087E8B',
                      },
                    ]}>
                    <Text style={styles.notesDateText}>
                      {moment(notes.updated_at).format('YYYY/dddd - HH:mm')}
                    </Text>
                    <Text style={styles.notesTopic}>{notes.note_topic}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.loadingText}>Loading ...</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
