import * as React from "react";
import { View, ScrollView, Text, Image, ImageBackground, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function More({ navigation }) {
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      resizeMode: 'cover',
      padding: 20,
    },
    image_logo: {
      borderWidth: 10,
      width: 80,
      height: 80,
      borderRadius: 100,
    },
    icon: {
      marginRight: 20,
      height: 20,
    },
  });
  return (
      <ScrollView>
        <View>
          <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 30,
            backgroundColor: 'blue',
          }}>
            <View style={styles.itemContainer}>
              <Image source={require('../../assets/images/one.jpg')} style={styles.image_logo} />

            </View>
            <Text style={{
              fontSize: 18,
              fontWeight: '900',
              marginTop: 30,
              paddingStart: 20,
              textAlign: "right",
              color: 'white',
              padding: 10,
            }}>Jane Doe <Icon name="person"  style={styles.icon} /> </Text>
          </View>
          <View style={styles.Container}>
            <Text style={styles.icon}><Icon name="person"/>Verse of the day</Text>
            <Text style={styles.icon}><Icon name="person"/>Notes</Text>
            <Text style={styles.icon}><Icon name="person"/>Saved Sermons</Text>
            <Text style={styles.icon}><Icon name="person"/>Events</Text>
            <Text style={styles.icon}><Icon name="person"/>Share App</Text>
            <Text style={styles.icon}><Icon name="person"/>About App</Text>
            <Text style={styles.icon}><Icon name="person"/>Church Websites</Text>
            <Text style={styles.icon}><Icon name="person"/>Settings</Text>
            <Text style={styles.icon}><Icon name="person"/>ProfileScreen</Text>
          </View>
        </View>
      </ScrollView>
  );
}
