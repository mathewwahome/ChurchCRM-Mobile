import * as React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../assets/css/styles";


export default function Notes({ navigation }) {
  const NewNoteScreen = () => {
    console.log("handleMain executed");

    navigation.navigate("NewNotes");
  };
  return (
    <View>
      <TouchableOpacity onPress={NewNoteScreen} style={styles.touchableOpacity}>
        <Text style={styles.notesTitle}>
          <Icon name="note-add" size={19} /> NEW NOTE
        </Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={{ padding: 10 }}>
          <ScrollView horizontal={false}>
            <View style={styles.rowContainer}>

              <View style={styles.notesContainer}>
                <Image source={require("../../assets/images/one.jpg")} style={styles.notesImage} />
                <Text style={styles.notesDateText}>Dec 20th 2022</Text>
                <Text style={styles.notesTopic}>Transform Your Life Journal</Text>
              </View>

              <View style={styles.notesContainer}>
                <Image source={require("../../assets/images/one.jpg")} style={styles.notesImage} />
                <Text style={styles.notesDateText}>Dec 20th 2022</Text>
                <Text style={styles.notesTopic}>Transform Your Life Journal</Text>
              </View>

              <View style={styles.notesContainer}>
                <Image source={require("../../assets/images/one.jpg")} style={styles.notesImage} />
                <Text style={styles.notesDateText}>Dec 20th 2022</Text>
                <Text style={styles.notesTopic}>Transform Your Life Journal</Text>
              </View>
       
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
