import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TextInput, Pressable, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../assets/css/styles';
import axios from 'axios';
import {BASE_URL} from '../../hooks/HandleApis';

export default function EditNotes({ noteId, reloadNotes, setReloadNotes }) {
  const navigation = useNavigation();
  const [data, setData] = useState({
    note_topic: '',
    content: '',
    userId: '',
  });

  const [loading, setLoading] = useState(true);
  const [note_topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [userID, setUserid] = useState('');

  // Fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getNote/${noteId}`);
      if (response.ok) {
        const responseData = await response.json();
        if (!responseData.error) {
          setData(responseData);
          setTopic(responseData.note_topic);
          setContent(responseData.content);
          setUserid(responseData.userID);
          setLoading(false);
        } else {
          console.error('Note not found');
          setLoading(false);
        }
      } else {
        console.error('Failed to fetch data:', response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error('Displaying notes failed:', error);
      setLoading(false);
    }
  };

  const updateNote = async () => {
    try {
      // console.log('The content: ', note_topic, content, noteId, userID);
      // console.log('setReloadNotes:', setReloadNotes);
      // if (typeof setReloadNotes === 'function') {
      //   setReloadNotes(true);
      //   console.log('setReloadNotes called');
      // }
      const response = await axios.post(
        `${BASE_URL}/api/updateNote/${noteId}`,
        {
          userID,
          note_topic,
          content,
        },
      );
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
          value={note_topic}
          onChangeText={text => setTopic(text)}
        />

        <Text style={styles.notesLabel}>Edit Notes</Text>
        <TextInput
          style={styles.notesTextArea}
          multiline={true}
          value={content}
          onChangeText={text => setContent(text)}
        />
        <View>
          <TouchableOpacity style={styles.submitNotesButton} onPress={updateNote}>
            <Text style={styles.submitNotes}>Update Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
