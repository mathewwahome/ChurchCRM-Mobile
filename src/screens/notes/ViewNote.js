import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../assets/css/styles';
import {BASE_URL} from '../../hooks/HandleApis';
import GlobalCss from '../../assets/css/GlobalCss';

export default function ViewNote({noteId}) {
  const my_note_id = noteId;
  console.log('id: ', my_note_id);
  const navigation = useNavigation();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getNote/${noteId}`);
        if (response.ok) {
          const responseData = await response.json();
          if (!responseData.error) {
            setData(responseData);
          } else {
            console.error('Note not found');
          }
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Displaying notes failed:', error);
      }
    };

    fetchData();
  }, [noteId]);

  const editNoteScreen = () => {
    navigation.navigate('EditNotes', {noteId, reloadNotes, setReloadNotes});
  };

  return (
    <ScrollView>
      <View style={styles.newNotesContainer}>
        <Text style={GlobalCss.title}>{data.note_topic}</Text>
        <Text style={GlobalCss.text}>{data.content}</Text>

        <Pressable
          style={styles.submitNotesButton}
          onPress={() => editNoteScreen(data.id)}>
          <Text style={styles.submitNotes}>Edit Note</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
