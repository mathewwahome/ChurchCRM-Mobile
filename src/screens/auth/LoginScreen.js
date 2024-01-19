import React, {useState} from 'react';
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
import useAuth from '../../hooks/HandleAuth';
import AppSnackbar from '../../hooks/SnackBar';
import {useRef} from 'react';
import {styles} from '../../assets/css/AuthScreens';
import Logo from '../../utilities/Logo';

import useForgotPassword from '../../hooks/HandleForgotPassword';
import CustomTextInput from '../../hooks/CustomTestInput';

export default function LoginScreen({setUserId}) {
  const {handleLogin, getLoggedId} = useAuth();

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

  const myLoginFunc = async () => {
    try {
      await handleLogin(userData.email, userData.password);
      const ID = getLoggedId();
      console.log('User ID: ', ID);
      setUserId(ID);
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

  const {handleForgotPassword} = useForgotPassword();

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
              <CustomTextInput
                iconName="person"
                placeholder="Email"
                placeholderTextColor={'#b7b7b7'}
                value={userData.email}
                onChangeText={text =>
                  setUserData(data => ({...data, email: text}))
                }
              />
              <CustomTextInput
                placeholder="Password"
                placeholderTextColor={'#b7b7b7'}
                secureTextEntry={!showPassword}
                value={userData.password}
                onChangeText={text =>
                  setUserData(data => ({...data, password: text}))
                }
              />
              {/* <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}>
                <Icon
                  name={password ? 'visibility-off' : 'visibility'}
                  size={20}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity style={styles.signin_btn} onPress={myLoginFunc}>
              <Text style={styles.auth_btn_text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgot_password}>Forgot password?</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        <AppSnackbar ref={appSnackbarRef} />
      </ScrollView>
    </View>
  );
}
