import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import CustomTextInput from '../../hooks/CustomTestInput';
import GlobalCss from '../../assets/css/GlobalCss';
import { styles } from '../../assets/css/AuthScreens';
import axios from 'axios';
import { BASE_URL } from '../../hooks/HandleApis';
import { useRef } from 'react';
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
        <Text style={{ ...styles.login_text, fontSize: 16, textAlign: 'center' }}>
          Enter the email address associated with your account
        </Text>
        <CustomTextInput
          iconName="mail"
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TouchableOpacity onPress={forgotPassword} style={styles.signin_btn}>
          <Text style={styles.auth_btn_text}>Send Reset Link</Text>
        </TouchableOpacity>
        <AppSnackbar ref={appSnackbarRef} />
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;
