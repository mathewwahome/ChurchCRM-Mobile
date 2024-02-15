import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/css/styles';
import { BASE_URL } from '../../hooks/HandleApis';
import GlobalCss from '../../assets/css/GlobalCss';
// import { RichEditor } from 'react-native-pell-rich-editor';
import AutoHeightWebView from 'react-native-autoheight-webview'
// import WebView from 'react-native-webview';
import { Dimensions } from 'react-native';

export default function ViewNote({ noteId }) {
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
            console.log(data.content)
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
    navigation.navigate('EditNotes');
  };

const [contentHeight, setContentHeight] = useState(null)
  return (
    <ScrollView>
      <View>
        <Text style={GlobalCss.title}>{data.note_topic}</Text>
        
          <View style={{flex: 1}}>
            <AutoHeightWebView
              style={{ width: Dimensions.get('window').width - 15, height: contentHeight * 3.07 }}
            customScript={`document.body.style.background = 'lightyellow'; window.ReactNativeWebView.postMessage(document.body.scrollHeight);`}
              customStyle={`
          * {
            font-family: 'Times New Roman';
            font-size: 18px;
          }
          
        `}
              onSizeUpdated={size => {
                // Update content height state
                setContentHeight(size.height);
                console.log("Content height: ", size.height);
              }}
              files={[{
                href: 'cssfileaddress',
                type: 'text/css',
                rel: 'stylesheet'
              }]}
              source={{ html: `<div style="font-size: 16px;">${data.content}</div>` }}
              scalesPageToFit={true}
              scrollEnabled={true}
              viewportContent={'width=device-width, user-scalable=no'}
            /*
            other react-native-webview props
            */
            />
          </View>
     
        {/* <RichEditor
          initialContentHTML={data.content}
          readOnly={true}
          style={GlobalCss.text}
        /> */}
        <Pressable
          style={styles.submitNotesButton}
          onPress={() => editNoteScreen(data.id)}>
          <Text style={styles.submitNotes}>Edit Note</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
