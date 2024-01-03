import React, {useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { styles } from "../../assets/css/SermonsScreen";

export default function Sermons({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "https://d8b0-197-232-61-243.ngrok-free.app/api/fetchEvents";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => {
        console.error("Error fetching data:", error);
        // You can handle the error state or show a user-friendly message here
      });
  }, []);

  return (
    <ScrollView>



      {/* <View>
        {data.map((post) => (
          <View>
            <Text style={{ fontSize: 20 }}>Event Id = {post.id}</Text>
            <Text style={{ color: "blue" }}>
              Event Title = {post.Event_Title}
            </Text>
            <Text style={{ color: "blue" }}>
              Event Date = {post.Event_Date}
            </Text>
            <Text style={{ color: "blue" }}>
              Event Description = {post.Event_Description}
            </Text>
          </View>
        ))}
      </View> */}


















      <ImageBackground
        source={require("../../assets/images/bg.jpg")}
        style={styles.backgroundImage}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            For I Know the plans I have {"\n"}
            for you, declares the{"\n"}
            Lord, plans for welfare and{"\n"}
            not for evil, to give you a{"\n"}
            future and hope.
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginTop: 30,
            }}
          >
            Jeremiah 29:11
          </Text>
        </View>
      </ImageBackground>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "900",
            marginTop: 30,
            paddingStart: 20,
            color: "black",
          }}
        >
          WATCH HISTORY
        </Text>
        <ScrollView horizontal={false}>
          <View style={styles.rowContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/images/one.jpg")}
              />
            </View>
            <View style={styles.itemContainer}>
              <Image
                source={require("../../assets/images/one.jpg")}
                style={styles.image}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.itemContainer}>
              <Image
                source={require("../../assets/images/bg.jpg")}
                style={styles.image}
              />
            </View>
            <View style={styles.itemContainer}>
              <Image
                source={require("../../assets/images/bg.jpg")}
                style={styles.image}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
