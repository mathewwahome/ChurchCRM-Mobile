import * as React from "react";
import { View, ScrollView, Text, Image, ImageBackground,TouchableOpacity , StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function SettingScreen({ navigation }) {
    const styles = StyleSheet.create({
        ScrollView: {
            paddingHorizontal: 20,

        },
        viewContainer: {
            marginBottom: 20,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
        },
        headerText: {
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color:'blue',
        },
        themeOptions: {
            marginTop: 20,
            paddingHorizontal: 20,

        },
        option: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        optionText: {
            marginLeft: 10,
            fontSize: 16,
            color:'blue',
        },
    });
    return (
        <ScrollView style={styles.ScrollView}>
            <View style={styles.viewContainer}>
                <View style={styles.header}>
                    <Icon size={24} color="blue" name="brightness-6" />
                    <Text style={styles.headerText}>App Theme</Text>
                </View>
                <View style={styles.themeOptions}>

                    <View style={styles.option}>
                        <Icon name="phone" />
                        <Text style={styles.optionText}>Dark</Text>
                    </View>
                    <View style={styles.option}>
                        <Icon name="phone" />
                        <Text style={styles.optionText}>Light</Text>
                    </View>
                    <View style={styles.option}>
                        <Icon name="phone" />
                        <Text style={styles.optionText}>Same as System</Text>
                    </View>
                </View>
            </View>
            <View style={styles.viewContainer}>
                <View style={styles.header}>
                    <Icon size={24} color="blue" name="notifications" />
                    <Text style={styles.headerText}>App Theme</Text>
                </View>
                <View style={styles.themeOptions}>
                    <View style={styles.option}>
                        <Icon name="phone" />
                        <Text style={styles.optionText}>Push Notification</Text>
                    </View>
                    <View style={styles.option}>
                        <Icon name="phone" />
                        <Text style={styles.optionText}>Verse of the day text</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
