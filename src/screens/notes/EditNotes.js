import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TextInput, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../assets/css/styles';
import axios from 'axios';
import {BASE_URL} from '../../hooks/HandleApis';

export default function EditNotes({userId, setReloadNotes, route}) {
  const {noteId} = route.params;

  const [note_topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [data, setData] = useState({});

  console.log('note id', noteId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getNote/${noteId}`);
        console.log('Response:', response);
        if (response.ok) {
          const responseData = await response.json();
          console.log('Response Data:', responseData);
          if (!responseData.error) {
            setData(responseData);
            console.log('Note Data:', responseData);
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

  return (
    <ScrollView>
      <View style={styles.newNotesContainer}>
        <Text style={styles.notesLabel}>Edit Topic</Text>
        <TextInput
          style={styles.notesInput}
          value={data.note_topic}
          onChangeText={setTopic}
        />

        <Text style={styles.notesLabel}>Edit Notes</Text>
        <TextInput
          style={styles.notesTextArea}
          multiline={true}
          value={data.content}
          onChangeText={setContent}
        />
        <Pressable style={styles.submitNotesButton}>
          <Text style={styles.submitNotes}>Update Note</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
