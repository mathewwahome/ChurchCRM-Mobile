import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { View, ScrollView, Text, Image, ImageBackground, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function ProfileScreen({ navigation, userId }) {

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

  // Get the user profile data
  const [data, setData] = useState([])

  useEffect(() => {
    if (userId) {
      console.log(userId)
      axios.get(`https://3e4b-197-232-61-204.ngrok-free.app/api/profile/${userId}`)
        .then(response => {
          setData(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.log("Error exists: ", error)
        })
    }
  }, [userId]);
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
          }}>{data.name} <Icon name="person" style={styles.icon} /> </Text>
        </View>

        <View style={{ ...styles.Container, flexDirection: 'col' }}>
          <View style={{ ...styles.Container_section, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.icon}>
              <Icon name="email" />{data.email}
            </Text>
            <Icon name="edit" />

          </View>
          <View style={{ ...styles.Container_section, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.icon}>
              <Icon name="phone" />{data.phone}
            </Text>
            <Icon name="edit" />

          </View>
          <View style={{ ...styles.Container_section, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.icon}>
              <Icon name="person" />{data.membership_status}
            </Text>
            <Icon name="edit" />

          </View>
        </View>
      </View>
    </ScrollView>
  );
}
