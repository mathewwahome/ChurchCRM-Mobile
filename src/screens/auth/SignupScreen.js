import React, {useState} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {handleRegister} from '../../hooks/HandleApis';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={{padding: 20}}>
      <ScrollView>
        <View style={styles.login_view}>
          <SafeAreaView style={styles.login_form}>
            <Text style={styles.login_text}>Sign up</Text>
            <View style={styles.inputContainer}>
              <Icon name="person" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={userData.name}
                onChangeText={text =>
                  setUserData(data => ({...data, name: text}))
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={userData.email}
                onChangeText={text =>
                  setUserData(data => ({...data, email: text}))
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="phone" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={userData.phone}
                onChangeText={text =>
                  setUserData(data => ({...data, phone: text}))
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={userData.password}
                onChangeText={text =>
                  setUserData(data => ({...data, password: text}))
                }
              />
            </View>

            <TouchableOpacity
              onPress={() =>
                handleRegister(
                  userData.name,
                  userData.email,
                  userData.phone,
                  userData.password,
                  navigation,
                )
              }
              title="Submit"
              style={styles.touchButton}>
              <Text style={{fontSize: 20, color: 'white'}}>Sign up</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text
                style={{
                  color: 'blue',
                  fontWeight: '900',
                  fontSize: 18,
                  marginTop: 30,
                }}>
                Have an account?
              </Text>
              <Pressable onPress={handleLogin}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 28,
                    textDecorationLine: 'underline',
                    color: 'black',
                  }}>
                  {' '}
                  Login
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  img_view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
    // resizeMode: "contain",
  },

  login_view: {
    paddingTop: 80,
    paddingBottom: 80,
    width: '100%',
  },
  login_text: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: '900',
    color: 'blue',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
    // resizeMode: "contain",
  },
  pickerStyles: {
    width: '100%',
    color: 'black',
  },
  touchButton: {
    paddingVertical: 10,
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#163c94',
    marginTop: 30,
    borderRadius: 30,
  },
});
