import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import {styles} from '../../assets/css/Login';
import GlobalCss from '../../assets/css/GlobalCss';
import axios from 'axios';
import {BASE_URL} from '../../hooks/HandleApis';
import {useRef} from 'react';
import Icon from '../../ui/components/icon';
import AppSnackbar from '../../hooks/SnackBar';

const ForgotPassword = () => {
  const appSnackbarRef = useRef();
  const [email, setEmail] = useState('');
  const forgotPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/forgot-password`, {
        email: email,
      });
      console.log(response);
      if (response.data && response.data.message === 'passwords.throttled') {
        appSnackbarRef.current.showSnackbar(
          'Too many password reset requests. Please wait a moment and try again.',
          'warning',
        );
      } else if (response.data && response.data.message === 'passwords.sent') {
        appSnackbarRef.current.showSnackbar(
          'Password reset link sent successfully',
          'success',
        );
      } else {
        appSnackbarRef.current.showSnackbar(
          'Failed to initiate password reset. Please try again.',
          'error',
        );
      }
    } catch (error) {
      console.error(error.message);

      appSnackbarRef.current.showSnackbar(
        'Failed to initiate password reset. Please try again.',
        'error',
      );
    }
  };

  return (
    <View style={GlobalCss.container}>
      <ScrollView>
        <Text style={styles.login_text}>
          Enter your email to reset your password
        </Text>

        <View style={styles.inputContainer}>
          <Icon name="mail" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <Pressable onPress={forgotPassword} style={styles.ForgotPasswordBtn}>
          <Text style={GlobalCss.ForgotPasswordTxt}>Forgot password?</Text>
        </Pressable>
        <AppSnackbar ref={appSnackbarRef} />
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;
