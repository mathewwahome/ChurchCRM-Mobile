import * as React from "react";
import { View, ScrollView, Text, Image, ImageBackground, StyleSheet, } from "react-native";

export default function Sermons({ navigation }) {
  const styles = StyleSheet.create({

    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 10,
    },
    itemContainer: {
      marginRight: 10,
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
        <ImageBackground
          source={require('../../assets/images/bg.jpg')}
          style={styles.backgroundImage}
        >
          <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 30,
          }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
              }}>
              For I Know the plans I have {'\n'}
              for you, declares the{'\n'}
              Lord, plans for welfare and{'\n'}
              not for evil, to give you a{'\n'}
              future and hope.
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginTop: 30,
              }}>
              Jeremiah 29:11
            </Text>
          </View>

        </ImageBackground>
        <View style={{ padding: 10, }}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: '900',
            marginTop: 30,
            paddingStart:20,
            color: 'black',
          }}>WATCH HISTORY</Text>
          <ScrollView horizontal={false}>
            <View style={styles.rowContainer}>
              <View style={styles.itemContainer}>
                <Image style={styles.image} source={require('../../assets/images/one.jpg')} />

              </View>
              <View style={styles.itemContainer}>
                <Image source={require('../../assets/images/one.jpg')} style={styles.image} />

              </View>
            </View>

            <View style={styles.rowContainer}>
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
