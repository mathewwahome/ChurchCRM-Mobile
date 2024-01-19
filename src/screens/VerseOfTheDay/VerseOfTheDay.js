import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Share,
  Clipboard,
} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {getVerseOfTheDayWithImage} from '../../hooks/verseOfTheDay';

export default function VerseOfTheDay({navigation}) {
  const [verseData, setVerseData] = useState({
    verse: {citation: '', passage: ''},
    imageUrl: '',
    loading: true,
  });

  useEffect(() => {
    const fetchAllVerse = async () => {
      try {
        const {passage, citation, imageUrl} = await getVerseOfTheDayWithImage();
        setVerseData({
          verse: {passage, citation},
          imageUrl,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching verse:', error);
        setVerseData(prevData => ({...prevData, loading: false}));
      }
    };

    fetchAllVerse();

    const updateAtMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);

      const timeUntilMidnight = midnight - now;

      setTimeout(() => {
        fetchAllVerse();

        setInterval(() => {
          fetchAllVerse();
        }, 24 * 60 * 60 * 1000);
      }, timeUntilMidnight);
    };

    updateAtMidnight();
  }, []);

  const shareContent = async () => {
    try {
      const message = `${verseData.verse.passage}\n${verseData.verse.citation}`;
      const url = verseData.imageUrl;
      await Share.share({message, url});
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyToClipboard = () => {
    const verseToCopy = `${verseData.verse.passage}\n${verseData.verse.citation}`;
    Clipboard.setString(verseToCopy);
    alert('Verse copied to clipboard!');
  };

  return (
    <View style={styles.verse_background}>
    <ImageBackground
      source={require('../../assets/images/verse_bg.jpg')}
      style={styles.backgroundImage}
      blurRadius={10}
      >
      <View style={styles.view}>
        {verseData.loading ? (
          <Text style={styles.loadingText}>Verse of the day loading...</Text>
        ) : (
          <>
            {verseData.verse && verseData.verse.passage ? (
              <>
                <Text style={styles.TextStyle}>{verseData.verse.passage}</Text>
                <Text
                  style={styles.verse}>
                  {verseData.verse.citation}
                </Text>
                {verseData.imageUrl ? (
                  <Image
                    style={styles.verseImage}
                    source={{uri: verseData.imageUrl}}
                  />
                ) : null}
                <TouchableOpacity
                  onPress={shareContent}
                  style={styles.shareButtonContainer}
                >
                  <Text style={styles.shareButton}>Share</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.loadingText}>
                Verse of the day not available
              </Text>
            )}
          </>
        )}
      </View>
    </ImageBackground>
    </View>
  );
}
