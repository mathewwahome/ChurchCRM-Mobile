import * as React from "react";
import { View, ScrollView, Text, Image, ImageBackground, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function ProfileScreen({ navigation }) {
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      resizeMode: 'cover',
      padding: 20,
    },
    Container_section: {
      paddingBottom: 10,
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
          backgroundColor: '#888',
        }}>
          <View style={styles.itemContainer}>
            <Image source={require('../../../assets/images/one.jpg')} style={styles.image_logo} />

          </View>
          <Text style={{
            fontSize: 18,
            fontWeight: '900',
            marginTop: 30,
            paddingStart: 20,
            textAlign: "right",
            color: 'white',
            padding: 10,
          }}>Jane Doe <Icon name="person" style={styles.icon} /> </Text>
        </View>

        <View style={{ ...styles.Container, flexDirection: 'col' }}>
          <View style={{ ...styles.Container_section, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.icon}>
              <Icon name="email" />email@gmail.email
            </Text>
            <Icon name="edit" />

          </View>
          <View style={{ ...styles.Container_section, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.icon}>
              <Icon name="phone" />0720 000 000
            </Text>
            <Icon name="edit" />

          </View>
          <View style={{ ...styles.Container_section, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.icon}>
              <Icon name="person" />Membership Status
            </Text>
            <Icon name="edit" />

          </View>
        </View>
      </View>
    </ScrollView>
  );
}
