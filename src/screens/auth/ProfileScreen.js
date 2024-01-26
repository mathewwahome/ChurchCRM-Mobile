import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Icon from '../../ui/components/icon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ImageConstant} from '../../hooks/ImageConstants';

import {BASE_URL} from '../../hooks/HandleApis';

import GlobalCss from '../../assets/css/GlobalCss';
export default function ProfileScreen({route, navigation}) {
  const [data, setData] = useState([]);
  const {userId, setUserId} = route.params;
  useEffect(() => {
    if (userId) {
      fetch(`${BASE_URL}/api/profile/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          console.log('User Data:', data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleSignOut = () => {
    console.log('Signing out...');
    setUserId(null);
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={GlobalCss.container}>
      <View style={styles.header}>
        <View style={styles.itemContainer}>
          {(() => {
            if (data.profile_photo_path) {
              const img = data.profile_photo_path;
              return (
                <Image
                  source={ImageConstant.ProfileImage}
                  style={styles.image_logo}
                />
              );
            } else {
              return (
                <Image
                  source={ImageConstant.DefaultProfile}
                  style={styles.image_logo}
                />
              );
            }
          })()}
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
