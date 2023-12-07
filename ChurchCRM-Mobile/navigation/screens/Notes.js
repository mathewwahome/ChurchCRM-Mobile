import * as React from "react";
import { View, ScrollView, Text, Image, ImageBackground, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Notes({ navigation }) {
  const styles = StyleSheet.create({


    rowContainer: {
      flexDirection: 'col',
      padding: 10,
      resizeMode: 'cover',

    },
    itemContainer: {
      marginTop: 10,
      flex: 1,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
    },
  });
  return (
    <View>
      <ScrollView>
        <View style={{ padding: 10, }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '900',
            marginTop: 30,
            paddingStart: 20,
            textAlign: "right",
            color: 'blue',
            padding: 10,
          }}>
          <Icon name="assignment" size={20} style={styles.icon} /> NEW NOTE</Text>
          <ScrollView horizontal={false}>
            <View style={styles.rowContainer}>
              <View style={styles.itemContainer}>
                <Image style={styles.image} source={require('../../assets/images/one.jpg')} />

              </View>
              <View style={styles.itemContainer}>
                <Image source={require('../../assets/images/one.jpg')} style={styles.image} />

              </View>
              <View style={styles.itemContainer}>
                <Image source={require('../../assets/images/bg.jpg')} style={styles.image} />

              </View>
              <View style={styles.itemContainer}>
                <Image source={require('../../assets/images/bg.jpg')} style={styles.image} />

              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
