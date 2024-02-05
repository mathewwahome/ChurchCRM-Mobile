import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TextInput, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../assets/css/styles';
import axios from 'axios';
import {BASE_URL} from '../../hooks/HandleApis';

export default function EditNotes({setReloadNotes, route}) {
  const {noteId} = route.params;

  const navigation = useNavigation();
  const [data, setData] = useState({});

  let [note_topic, setTopic] = useState('');
  let [content, setContent] = useState('');

  const handleChange = input => {
    // Update the state with the new input
    setTopic(input);
    setContent(input);
  };

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
            const userId = responseData.userId;
            console.log('Users id ', userId);
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

  // updateNote
  const userId = data.userId;

  const updateNote = async () => {
    console.log('User id ', userId);
    try {
      const user_id_fk = data.userId;
      console.log('The content: ', note_topic, content, user_id_fk);
      const response = await axios.post(
        `${BASE_URL}/api/updateNote/${noteId}`,
        {
          user_id_fk,
          note_topic,
          content,
        },
      );
      console.log('updated Note data: ', response.data);
      if (response.status === 200) {
        setReloadNotes(true);
        navigation.navigate('Notes');
      }
    } catch (error) {
      console.error('Notes Update failed:', error);
    }
  };
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
          numberOfLines={10}
          onChangeText={setContent}
          placeholder="useless placeholder"
        />
        <Pressable style={styles.submitNotesButton} onPress={updateNote}>
          <Text style={styles.submitNotes}>Update Note</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
