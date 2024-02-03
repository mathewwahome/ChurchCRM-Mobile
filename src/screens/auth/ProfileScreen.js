import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ImageConstant} from '../../hooks/ImageConstants';
import AppSnackbar from '../../hooks/SnackBar';
import {BASE_URL} from '../../hooks/HandleApis';
import {styles as authstyles} from '../../assets/css/AuthScreens';
import GlobalCss from '../../assets/css/GlobalCss';
import {styles} from '../../assets/css/ProfileScreen';
import CustomTextInput from '../../hooks/CustomTestInput';
import {launchImageLibrary} from 'react-native-image-picker';
import {useCallback} from 'react';
import useAuth from '../../hooks/HandleAuth';

export default function ProfileScreen({userId, setUserId}) {
  const {handleLogout} = useAuth();
  const [data, setData] = useState([]);
  const appSnackbarRef = useRef();

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
          // console.log('User Data:', data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleSignOut = async () => {
    try {
      // Call handleLogout to sign the user out
      await handleLogout();
      
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  // Update details
  const handleUpdate = async () => {
    console.log(data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('password', data.password);
    formData.append('membership_status', data.membership_status);

    if (data.profile_photo_path) {
      const uriParts = data.profile_photo_path.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('profile_photo_path', {
        uri: data.profile_photo_path,
        name: `profile_photo.${fileType}`,
        type: `image/${fileType}`,
      });
      try {
        const response = await axios.post(
          `${BASE_URL}/api/update_user/${userId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (response === 200) {
          toggleModal();
          console.log(response);
        }
      } catch (error) {
        console.error('failed');
      }
    }
  };

  // Display Modal
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Get image
  const handleChoosePhoto = useCallback(() => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      width: 150,
      height: 150,
    };

    launchImageLibrary(options, response => {
      console.log('Getting photo', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.assets[0].uri;
        const lastDotIndex = imageUri.lastIndexOf('.');
        const fileType =
          lastDotIndex !== -1 ? imageUri.slice(lastDotIndex + 1) : '';
        console.log(imageUri);
        if (imageUri) {
          console.log('Selected image path:', imageUri);
          setData(data => ({...data, profile_photo_path: imageUri}));
        } else {
          console.log('Unable to determine image path.');
        }
      }
    });
  }, [data.profile_photo_path]);

  return (
    <View style={GlobalCss.container}>
      <View style={styles.header}>
        <View>
          <Image
            style={{...styles.image_logo, marginTop: 10}}
            source={{
              uri: `${BASE_URL}/Mobile_App_Profile_Pics/${data.profile_photo_path}`,
            }}
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
              <Icon name="person" />
              {data.name}
            </Text>
            <Icon name="edit" style={styles.icon} onPress={toggleModal} />
          </View>
        </View>
        <View style={styles.containerSection}>
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="phone" />
              {data.phone}
            </Text>
            <Icon name="edit" style={styles.icon} onPress={toggleModal} />
          </View>
        </View>
        <View style={styles.containerSection}>
          <View style={styles.row}>
            <Text style={styles.icon}>
              <Icon name="person" />
              {data.membership_status}
            </Text>
            <Icon name="edit" style={styles.icon} onPress={toggleModal} />
          </View>
        </View>

        <View>
          <Modal
            isVisible={isModalVisible}
            userId={userId}
            style={{paddingTop: 100}}>
            <View style={{flex: 1}}>
              <ScrollView>
                <View style={styles.login_view}>
                  <SafeAreaView style={styles.login_form}>
                    <Text
                      style={{
                        ...authstyles.login_text,
                        color: '#ffffff',
                        borderBottomColor: '#369DAE',
                        borderBottomWidth: 2,
                      }}>
                      Edit Details
                    </Text>
                    <View>
                      <View
                        style={{
                          ...styles.account_container,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          paddingTop: 20,
                        }}>
                        <Text
                          style={{
                            ...authstyles.login_text,
                            color: '#ffffff',
                            fontWeight: '600',
                            fontSize: 16,
                          }}>
                          Profile Photo
                        </Text>
                        <TouchableOpacity
                          onPress={handleChoosePhoto}
                          style={{...styles.signOutButton, width: '65%'}}>
                          <Text
                            style={{
                              ...authstyles.auth_btn_text,
                              color: '#ffffff',
                            }}>
                            Choose from device
                          </Text>
                        </TouchableOpacity>
                        {data.profile_photo_path && (
                          <View>
                            <Image
                              source={{uri: data.profile_photo_path}}
                              style={styles.image}
                            />
                          </View>
                        )}
                      </View>

                      <CustomTextInput
                        iconName="user"
                        placeholder="Name"
                        value={data.name}
                        onChangeText={text =>
                          setData(data => ({...data, name: text}))
                        }
                      />

                      <CustomTextInput
                        iconName="mail"
                        placeholder="Email"
                        value={data.email}
                        onChangeText={text =>
                          setData(data => ({...data, email: text}))
                        }
                      />

                      <CustomTextInput
                        iconName="phone"
                        placeholder="Phone"
                        value={data.phone}
                        onChangeText={text =>
                          setData(data => ({...data, phone: text}))
                        }
                      />

                      <CustomTextInput
                        iconName="lock"
                        placeholder="Password"
                        secureTextEntry
                        value={data.password}
                        onChangeText={text =>
                          setData(data => ({...data, password: text}))
                        }
                      />
                    </View>

                    <View
                      style={{
                        ...styles.account_container,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        onPress={handleUpdate}
                        title="Update"
                        style={{...styles.signOutButton, width: '35%'}}>
                        <Text
                          style={{
                            ...authstyles.auth_btn_text,
                            color: '#ffffff',
                          }}>
                          Update
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{...styles.signOutButton, width: '35%'}}
                        onPress={toggleModal}>
                        <Text style={authstyles.auth_btn_text}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                </View>
                <AppSnackbar ref={appSnackbarRef} />
              </ScrollView>
            </View>
          </Modal>
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
