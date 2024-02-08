import * as React from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../assets/css/styles';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../hooks/HandleApis';
import GlobalCss from '../assets/css/GlobalCss';
import moment from 'moment';

export default function Notes({
  userId,
  reloadNotes,
  setReloadNotes,
  setNoteId,
}) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
    console.log('Reloading: ', reloadNotes); //
    setReloadNotes(false);
  }, [reloadNotes]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/showNotes/${userId}`);
      if (response.ok) {
        const responseData = await response.json();
        if (!responseData.error) {
          setData(responseData);
        } else {
          console.log('Error displaying notes.');
        }
      } else {
        console.error('Failed to fetch notes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
  // ERROR  TypeError: setNotesId is not a function (it is undefined), js engine: hermes
  const NewNoteScreen = () => {
    navigation.navigate('NewNotes');
  };

  const viewNoteScreen = myNoteId => {
    setNoteId(myNoteId)
    navigation.navigate('ViewNote');
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    if (offsetY === 0 && !isRefreshing) {
      setIsRefreshing(true);
      setReloadNotes(true);
      setIsRefreshing(false);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={NewNoteScreen} style={styles.touchableOpacity}>
        <Text style={styles.notesTitle}>
          <Icon name="note-add" size={19} /> NEW NOTE
        </Text>
      </TouchableOpacity>

      <ScrollView onScroll={handleScroll}>
        <View style={GlobalCss.container}>
          <ScrollView horizontal={false}>
            <View style={styles.rowContainer}>
              {data.length > 0 ? (
                data.map(notes => (
                  <TouchableOpacity
                    key={notes.id}
                    onPress={() => viewNoteScreen(notes.id)}
                    style={[styles.notesContainer]}>
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
