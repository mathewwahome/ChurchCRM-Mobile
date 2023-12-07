import * as React from "react";
import { View, ScrollView, Text, Image, ImageBackground, StyleSheet, } from "react-native";

export default function HomeScreen({ navigation }) {
  const styles = StyleSheet.create({

    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    image: {
      width: '100%',
      height: 100,
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
            color: 'green',
          }}>Announcements</Text>
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View style={{ marginRight: 10 }}>
                <Image style={styles.image} source={require('../../assets/images/one.jpg')} />
                <Text>Dec 20th 2022</Text>
                <Text>Raise them the christian way</Text>
              </View>
              <View style={{ marginRight: 10 }}>
                <Image source={require('../../assets/images/one.jpg')} style={styles.image} />
                <Text>Dec 20th 2022</Text>
                <Text>Raise them the christian way</Text>
              </View>
              <View style={{ marginRight: 10 }}>
                <Image source={require('../../assets/images/bg.jpg')} style={styles.image} />
                <Text>Dec 20th 2022</Text>
                <Text>Raise them the christian way</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ padding: 10, }}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: '900',
            marginTop: 30,
            color: 'green',
          }}>Sermons</Text>
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View style={{ marginRight: 10 }}>
                <Image source={require('../../assets/images/one.jpg')} style={styles.image} />
                <Text>Dec 20th 2022</Text>
                <Text>Raise them the christian way</Text>
              </View>
              <View style={{ marginRight: 10 }}>
                <Image source={require('../../assets/images/bg.jpg')} style={styles.image} />
                <Text>Dec 20th 2022</Text>
                <Text>Raise them the christian way</Text>
              </View>
              <View style={{ marginRight: 10 }}>
                <Image source={require('../../assets/images/two.jpg')} style={styles.image} />
                <Text>Dec 20th 2022</Text>
                <Text>Raise them the christian way</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{
          padding: 10,
          backgroundColor: "#48A6F9",
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '900',
            marginTop: 30,
            color: 'green',
          }}>Sermons</Text>
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View style={{ marginRight: 10 }}>
                <Image source={require('../../assets/images/one.jpg')} style={styles.image} />
                <Text style={{ color: 'white' }}>Dec 20th 2022</Text>
                <Text style={{ color: 'white' }}>Notes of christian Life</Text>
              </View>
              <View style={{ marginRight: 10 }}>
                <Image source={require('../../assets/images/two.jpg')} style={styles.image} />
                <Text style={{ color: 'white' }}>Dec 20th 2022</Text>
                <Text style={{ color: 'white' }}>The ultimate christian course</Text>
              </View>
              <View style={{ marginRight: 10 }}>
                <Image source={require('../../assets/images/bg.jpg')} style={styles.image} />
                <Text style={{ color: 'white' }}>Dec 20th 2022</Text>
                <Text style={{ color: 'white' }}>Transform your life journey</Text>
              </View>
            </View>
          </ScrollView>
        </View>

      </ScrollView>
    </View>
  );
}
