import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../assets/css/styles";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SermonNotes({ route }) {
    const [note_topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const navigation = useNavigation();

    const [data, setData] = useState([]);
    const [sermonData, setSermonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const FILE_BASE = "https://3829-197-232-61-194.ngrok-free.app";


    const { sermonId } = route.params;

    const url = `https://3829-197-232-61-194.ngrok-free.app/api/fetch/sermonNotes/${sermonId}`;

    const handleSermonNotes = () => {
        // 
    }

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setLoading(false);
                console.log("Fetching sermon data")
            })
            .catch((error) => {
                console.error(`Error fetching data from ${url}:`, error);
                setLoading(false);
            });
    }, []);

    const saveNotes = async () => {
        try {
            console.log("The content: ", note_topic, content)
            const user_id_fk = userId
            const response = await axios.post(
                "https://3829-197-232-61-194.ngrok-free.app/api/newNotes",
                {
                    user_id_fk,
                    note_topic,
                    content,
                }
            );
            console.log("Notes data: ", response.data)
            navigation.navigate("Notes");
        } catch (error) {
            console.error("Notes Save failed:", error);
        }
    };
    return (
        <ScrollView>

            <View style={{ padding: 10 }}>
                <ScrollView horizontal={false}>
                    <View style={styles.rowContainer}>
                        <View style={styles.notesContainer} >
                            <Image
                                source={{
                                    uri: `${FILE_BASE}/SermonThumbnails/${data.Thumbnail}`,
                                }}
                                style={styles.notesImage}
                            />
                            <Text style={styles.notesDateText}>
                                {new Date(data.created_at).toDateString()}
                            </Text>
                            <Text style={styles.notesTopic}>{data.Title}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.notesContainer}>
                    <View>
                        <Image
                            style={styles.image}
                            source={{
                                uri: `${FILE_BASE}/SermonThumbnails/${data.Thumbnail}`,
                            }}
                        />
                    </View>
                    <Text style={styles.notesDateText}>
                        {new Date(data.created_at).toDateString()}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.takeNotesLabel}>
                        <Text style={styles.takeNotes}>TAKE NOTES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.takeNotesLabel}>
                        <Text style={styles.sermonNotes} onPress={handleSermonNotes}>SERMON NOTES</Text>
                    </TouchableOpacity>
                </View>
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
