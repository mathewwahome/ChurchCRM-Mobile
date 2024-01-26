import React, {useState} from 'react';
import {View, ScrollView, Text, TextInput, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../assets/css/styles';
import axios from 'axios';
import {BASE_URL} from '../../hooks/HandleApis';

export default function NewNotes({userId, setReloadNotes}) {
  const [note_topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  const saveNotes = async () => {
    console.log('User id ', userId);
    try {
      const user_id_fk = userId;
      console.log('The content: ', note_topic, content, user_id_fk);
      const response = await axios.post(`${BASE_URL}/api/newNotes`, {
        user_id_fk,
        note_topic,
        content,
      });
      console.log('Notes data: ', response.data);
      if (response.status === 200) {
        navigation.navigate('Notes');
        setReloadNotes(true);
      }
    } catch (error) {
      console.error('Notes Save failed:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.newNotesContainer}>
        <Text style={styles.notesLabel}>Add Topic</Text>
        <TextInput
          style={styles.notesInput}
          value={note_topic}
          onChangeText={setTopic}
        />

        <Text style={styles.notesLabel}>Take notes</Text>
        <TextInput
          style={styles.notesTextArea}
          multiline={true}
          value={content}
          onChangeText={setContent}
        />

        <Pressable style={styles.submitNotesButton} onPress={saveNotes}>
          <Text style={styles.submitNotes}> Add Notes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
