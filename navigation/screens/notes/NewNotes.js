import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../../assets/css/styles";

export default function NewNotes({ navigation }) {
  const [Topic, setTopic] = useState("");
  const [Subtopic, setSubject] = useState("");
  const [Notes, setNotes] = useState("");

  const saveNotes = async () => {
    try {
      const response = await axios.post(
        "https://2137-197-232-61-201.ngrok-free.app/api/newnotes",
        {
          Topic,
          Subtopic,
          Notes,
        }
      );
      const token = response.data.token;
      navigation.navigate("Notes");
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.newNotesContainer}>
        <Text style={styles.notesLabel}>Add Topic</Text>
        <TextInput
          style={styles.notesInput}
          value={Topic}
          onChangeText={setTopic}
        />

        <Text style={styles.notesLabel}>Add Subject</Text>
        <TextInput
          style={styles.notesInput} 
          value={Subtopic}
          onChangeText={setSubject}
        />

        <Text style={styles.notesLabel}>Take notes</Text>
        <TextInput
          style={styles.notesTextArea}
          multiline={true}
          value={Notes}
          onChangeText={setNotes}
        />


        <Pressable style={styles.submitNotesButton} onPress={saveNotes}>
          <Text style={styles.submitNotes}> Add Notes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
