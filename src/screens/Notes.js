import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../assets/css/styles';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../hooks/HandleApis';
import GlobalCss from '../assets/css/GlobalCss';
import {styles as card} from '../assets/css/Card';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
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
  const NewNoteScreen = () => {
    navigation.navigate('NewNotes');
  };

  const viewNoteScreen = myNoteId => {
    setNoteId(myNoteId);
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
            <View style={styles.colContainer}>
              {data.length > 0 ? (
                data.map(notes => (
                  <View style={card.cardContainer}>
                    <Text style={card.notesDateText}>
                      {moment(notes.updated_at).format('YYYY/dddd - HH:mm')}
                    </Text>
                    <Text style={card.notesTopic}>{notes.note_topic}</Text>
                    <MenuProvider style={card.menuProvider}>
                      <Menu style={card.menuContainer}>
                        <MenuTrigger style={card.menuTrigger}>
                          <Icon name={'more-vert'} size={20} color="#ffffff" />
                        </MenuTrigger>
                        <MenuOptions style={card.menuOptions}>
                          <MenuOption>
                            <Pressable
                              key={notes.id}
                              onPress={() => viewNoteScreen(notes.id)}>
                              <Icon name={'edit'} color="#000000" size={20} />
                            </Pressable>
                          </MenuOption>
                          <MenuOption>
                            <Icon name={'share'} color="#000000" size={20} />
                          </MenuOption>
                          <MenuOption>
                            <Icon
                              name={'delete-forever'}
                              color="#000000"
                              size={20}
                            />
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </MenuProvider>
                  </View>
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
