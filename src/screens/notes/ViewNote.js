import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../assets/css/styles';
import {BASE_URL} from '../../hooks/HandleApis';
import GlobalCss from '../../assets/css/GlobalCss';
export default function ViewNote({route}) {
  const {noteId} = route.params;

  const navigation = useNavigation();
  const [data, setData] = useState({});

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
  console.log('go to edit notes screen', noteId);

  const editNoteScreen = () => {
    console.log('go to edit notes screen', noteId);
    navigation.navigate('EditNotes', {noteId});
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
