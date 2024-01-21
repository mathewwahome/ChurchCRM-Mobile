import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Icon from '../../ui/components/icon';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {BASE_URL} from '../../hooks/HandleApis';
export default function ProfileScreen({route, navigation}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'space-between',
    },
    header: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 30,
      backgroundColor: '#087E8B',
    },
    headerText: {
      fontSize: 18,
      fontWeight: '900',
      marginTop: 30,
      paddingStart: 20,
      textAlign: 'right',
      color: 'white',
      padding: 10,
    },
    content: {
      flex: 4,
    },
    containerSection: {
      // flex: 1,
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'space-between',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icon: {
      color: '#000000',
    },
    image_logo: {
      borderWidth: 10,
      width: 80,
      height: 80,
      borderRadius: 100,
    },
    footer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    signOutButton: {
      backgroundColor: '#087E8B',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    signOutButtonText: {
      color: 'white',
      fontSize: 16,
    },
    text: {
      color: '#000000',
    },
  });

  const [data, setData] = useState([]);
  const {userId, setUserId} = route.params;
  useEffect(() => {
    if (userId) {
      // console.log(userId);
      axios
        .get(`${BASE_URL}/api/profile/${userId}`)
        .then(response => {
          setData(response.data);
          // console.log(response.data);
        })
        .catch(error => {
          console.log('Error exists: ', error);
        });
    }
  }, [userId]);

  const handleSignOut = () => {
    console.log('Signing out...');
    setUserId(null);
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.itemContainer}>
          <Image
            source={require('../../assets/images/one.jpg')}
            style={styles.image_logo}
          />
        </View>
        <Text style={styles.headerText}>
          {data.name} <Icon name="person" style={styles.icon} />
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.containerSection}>
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="email" />
              {data.name}
            </Text>
            <Icon name="edit" style={styles.icon} />
          </View>
        </View>
        <View style={styles.containerSection}>
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="phone" />
              {data.phone}
            </Text>
            <Icon name="edit" style={styles.icon} />
          </View>
        </View>
        <View style={styles.containerSection}>
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="person" />
              {data.membership_status}
            </Text>
            <Icon name="edit" style={styles.icon} />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
