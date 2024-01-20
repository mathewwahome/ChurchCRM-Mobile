import * as React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../assets/css/styles';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../hooks/HandleApis';

export default function Notes({userId}) {
  const navigation = useNavigation();

  const NewNoteScreen = () => {
    console.log('handleMain executed');
    navigation.navigate('NewNotes');
  };

  const editNoteScreen = noteId => {
    console.log('go to edit screen');
    navigation.navigate('EditNotes', {noteId});
  };

  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/showNotes/${userId}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Displaying notes failed:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={NewNoteScreen} style={styles.touchableOpacity}>
        <Text style={styles.notesTitle}>
          <Icon name="note-add" size={19} /> NEW NOTE
        </Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={{padding: 10}}>
          <ScrollView horizontal={false}>
            <View style={styles.rowContainer}>
              {data.length > 0 ? (
                data.map(notes => (
                  <TouchableOpacity
                    key={notes.id}
                    onPress={() => editNoteScreen(notes.id)}
                    style={styles.notesContainer}>
                    <Image
                      source={require('../assets/images/one.jpg')}
                      style={styles.notesImage}
                    />
                    <Text style={styles.notesDateText}>
                      {notes.content}
                    </Text>
                    <Text style={styles.notesTopic}>
                      {notes.note_topic}
                    </Text>
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
