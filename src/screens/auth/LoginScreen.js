import React, {useState} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {handleLogin} from '../../hooks/HandleApis';
import Icon from '../../ui/components/icon';
import {accent, black} from '../../utilities/colors';
import AppSnackbar from '../../hooks/SnackBar';
import {useRef} from 'react';
import {styles} from '../../assets/css/AuthScreens';
import {BASE_URL} from '../../hooks/HandleApis';
import Logo from '../../utilities/Logo';
export default function LoginScreen({setUserId}) {
  const [showPassword, setShowPassword] = useState(false);
  const appSnackbarRef = useRef();
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onPressLogin = async () => {
    try {
      await handleLogin(
        userData.email,
        userData.password,
        setUserId,
        navigation,
      );
      appSnackbarRef.current.showSnackbar('Logged in successfully', 'success');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        appSnackbarRef.current.showSnackbar(
          'Wrong email or password',
          'warning',
        );
      } else {
        appSnackbarRef.current.showSnackbar(
          'An unexpected error occurred. Please try again.',
          'error',
        );
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <View style={{padding: 20}}>
      <ScrollView>
        <View style={styles.signup_img}>
          <Logo styles={styles.signup_img} />
        </View>

        <View style={styles.login_view}>
          <SafeAreaView style={styles.login_form}>
            <Text style={styles.login_text}>Enter Email & Password</Text>
            <View>
              <TextInput
                style={styles.login_input}
                placeholder="Email"
                placeholderTextColor={'#b7b7b7'}
                value={userData.email}
                onChangeText={text =>
                  setUserData(data => ({...data, email: text}))
                }
              />
            </View>
            <View>
              {/* <Icon name="lock" size={20} color="black" style={styles.icon} /> */}
              <TextInput
                style={styles.login_input}
                placeholder="Password"
                placeholderTextColor={'#b7b7b7'}
                secureTextEntry={!showPassword}
                value={userData.password}
                onChangeText={text =>
                  setUserData(data => ({...data, password: text}))
                }
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}>
                {/* <Icon
                  name={email ? 'visibility-off' : 'visibility'}
                  size={20}
                  color="black"
                  style={styles.icon}
                /> */}
              </TouchableOpacity>
            </View>
            <Pressable
              // onPress={onPressLogin}
              onPress={() =>
                handleLogin(userData.email, userData.password, navigation)
              }
              style={{
                paddingVertical: 10,
                width: '100%',
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'lightblue',
                marginTop: 30,
                borderRadius: 30,
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>Login</Text>
            </Pressable>
            <Text style={styles.forgot_password}>Forgot password?</Text>
          </SafeAreaView>
        </View>
        <AppSnackbar ref={appSnackbarRef} />
      </ScrollView>
    </View>
  );
}

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};


const handleLogin = async (email, password, navigation) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/login`,
      {email, password},
      config,
    );

    console.log('API Response:', response);

    if (response && response.data) {
      // Handle successful login
      const token = response.data.token;
      const loggedId = response.data.userId;
      // setUserId(loggedId);
      navigation.navigate('MainContainer');
    } else {
      console.error('Login failed: No data in the response');
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
