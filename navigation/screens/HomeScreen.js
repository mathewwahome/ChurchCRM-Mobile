import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, ImageBackground } from "react-native";
import { styles } from "../../assets/css/HomeScreen";

export default function HomeScreen({ navigation }) {
  const BASE_URL = "https://d8b0-197-232-61-243.ngrok-free.app/api/";

  const [sermonsData, setSermonsData] = useState([]);
  const [sermonNotesData, setSermonNotesData] = useState([]); //==

  const [AnnouncementsData, setAnnouncementsData] = useState([]); //==

  const [sermonsLoading, setSermonsLoading] = useState(true);
  const [sermonNotesLoading, setsermonNotesLoading] = useState(true); //==

  const [AnnouncementsLoading, setAnnouncementsLoading] = useState(true); //==

  const generateUrl = (endpoint) => {
    return `${BASE_URL}${endpoint}`;
  };

  const sermonsUrl = generateUrl("fetchSermons");
  const sermonNotesUrl = generateUrl("fetchSermons");
  const announcementsUrl = generateUrl("fetchAnnouncements");

  const fetchData = (url, setData, setLoading) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching data from ${url}:`, error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(sermonsUrl, setSermonsData, setSermonsLoading);
  }, []);

  useEffect(() => {
    fetchData(sermonNotesUrl, setSermonNotesData, setsermonNotesLoading);
  }, []);

  useEffect(() => {
    fetchData(announcementsUrl, setAnnouncementsData, setAnnouncementsLoading);
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
          Announcement
        </Text>
        {AnnouncementsLoading ? (
          <Text>Loading sermons...</Text>
        ) : (
          AnnouncementsData.map((announcements) => (
            <View key={announcements.id}>
              <Text style={{ fontSize: 20 }}>
                Sermon Id = {announcements.id}
              </Text>
            </View>
          ))
        )}

        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
          Sermons
        </Text>
        {sermonsLoading ? (
          <Text>Loading sermons...</Text>
        ) : (
          sermonsData.map((sermon) => (
            <View key={sermon.id}>
              <Text style={{ fontSize: 20 }}>Sermon Id = {sermon.id}</Text>
            </View>
          ))
        )}

        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
          Sermon Notes
        </Text>
        {sermonNotesLoading ? (
          <Text>Loading sermon Notes...</Text>
        ) : (
          sermonNotesData.map((sermonnotes) => (
            <View key={sermonnotes.id}>
              <Text style={{ fontSize: 20 }}>Sermon Id = {sermonnotes.id}</Text>
            </View>
          ))
        )}
      </View>

      <ImageBackground
        source={require("../../assets/images/bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.view}>
          <Text style={styles.TextStyle}>
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
        <Text style={styles.headingText}>Announcements</Text>

        <ScrollView horizontal={true}>
          {AnnouncementsLoading ? (
            <Text>Loading sermons...</Text>
          ) : (
            AnnouncementsData.map((announcements) => (
              <View key={announcements.id}>
                <View style={{ flexDirection: "row", padding: 10 }}>
                  <View style={{ marginRight: 10 }}>
                    <Text style={{ fontSize: 20 }}>
                      Announcement = {announcements.id}
                    </Text>
                    <Image
                      style={styles.image}
                      source={require("../../assets/images/one.jpg")}
                    />
                    <Text>
                      {new Date(announcements.created_at).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Text>
                    <Text>{announcements.Topic}</Text>
                    <Text>{announcements.Message}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/*  */}
        <Text style={styles.headingText}>Announcements</Text>
        {/*  */}

        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={{ marginRight: 10 }}>
              <Image
                style={styles.image}
                source={require("../../assets/images/one.jpg")}
              />
              <Text>Dec 20th 2022</Text>
              <Text>Raise them the christian way</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../assets/images/one.jpg")}
                style={styles.image}
              />
              <Text>Dec 20th 2022</Text>
              <Text>Raise them the christian way</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../assets/images/bg.jpg")}
                style={styles.image}
              />
              <Text>Dec 20th 2022</Text>
              <Text>Raise them the christian way</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.headingText}>Sermons</Text>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../assets/images/one.jpg")}
                style={styles.image}
              />
              <Text>Dec 20th 2022</Text>
              <Text>Raise them the christian way</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../assets/images/bg.jpg")}
                style={styles.image}
              />
              <Text>Dec 20th 2022</Text>
              <Text>Raise them the christian way</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../assets/images/two.jpg")}
                style={styles.image}
              />
              <Text>Dec 20th 2022</Text>
              <Text>Raise them the christian way</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          padding: 10,
          backgroundColor: "#48A6F9",
        }}
      >
        <Text style={styles.headingText}>Sermon Notes</Text>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../assets/images/one.jpg")}
                style={styles.image}
              />
              <Text style={{ color: "white" }}>Dec 20th 2022</Text>
              <Text style={{ color: "white" }}>Notes of christian Life</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../assets/images/two.jpg")}
                style={styles.image}
              />
              <Text style={{ color: "white" }}>Dec 20th 2022</Text>
              <Text style={{ color: "white" }}>
                The ultimate christian course
              </Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../assets/images/bg.jpg")}
                style={styles.image}
              />
              <Text style={{ color: "white" }}>Dec 20th 2022</Text>
              <Text style={{ color: "white" }}>
                Transform your life journey
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
