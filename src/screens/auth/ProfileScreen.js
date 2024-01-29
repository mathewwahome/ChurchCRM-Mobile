import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
// import Icon from '../../ui/components/icon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ImageConstant} from '../../hooks/ImageConstants';

import {BASE_URL} from '../../hooks/HandleApis';

import GlobalCss from '../../assets/css/GlobalCss';
import {styles} from '../../assets/css/ProfileScreen';

export default function ProfileScreen({route, navigation}) {
  const [userId, setUserId] = useState(route.params.userId);
  const {reloadNotes, setReloadNotes} = route.params;
  const [data, setData] = useState([]);
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
    setUserId(null);
    navigation.navigate('Root', {
      screen: 'LoginScreen',
    });
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
