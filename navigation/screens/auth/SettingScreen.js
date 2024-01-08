import React, { useMemo, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import RadioGroup from "react-native-radio-buttons-group";


import { styles } from "../../../assets/css/SettingScreen";

export default function SettingScreen({ navigation }) {
 
  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Dark",
        value: "option1",
      },
      {
        id: "2",
        label: "Light",
        value: "option2",
      },{
        id: "3",
        label: "Same as System",
        value: "option3",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState();

  return (
    <ScrollView style={styles.ScrollView}>





        
      <View style={styles.viewContainer}>
        <View style={styles.header}>
          <Icon size={24} color="blue" name="brightness-6" />
          <Text style={styles.headerText}>App Theme</Text>
        </View>
        <View style={styles.themeOptions}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
          />
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
