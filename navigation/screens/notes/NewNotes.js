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

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://2137-197-232-61-201.ngrok-free.app/api/login",
        {
          Topic,
          Subtopic,
          Notes,
        }
      );
      const token = response.data.token;
      navigation.navigate("MainContainer");
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.inputContainer}>

        <Text>Add Topic</Text>
        <TextInput
          style={styles.input}
          value={Topic}
          onChangeText={setTopic}
          placeholder="Add Topic"
        />

        <Text>Add Subject</Text>
        <TextInput
          style={styles.input}
          value={Subtopic}
          onChangeText={setSubject}
          placeholder="Add Subject"
        />

        <Text>Take notes</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Take notes"
          multiline={true}
          value={Notes}
          onChangeText={setNotes}
        />

        
        <Pressable onPress={SaveNotes}>
          <Text> Add Notes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
