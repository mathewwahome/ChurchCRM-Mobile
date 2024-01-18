import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import {styles} from '../../assets/css/Login';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {BASE_URL} from '../../hooks/HandleApis';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const forgotPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/forgot-password`, {
        email: email,
      });
      if (response.data && response.data.message) {
        console.log(response.data.message);
      } else {
        console.error('Unexpected response format');
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert(
        'Error',
        'Failed to initiate password reset. Please try again.',
      );
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text style={styles.login_text}>
        Enter your email to reset your password
      </Text>

      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <Pressable
        onPress={forgotPassword}
        style={{
          paddingVertical: 10,
          width: '100%',
          height: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          marginTop: 30,
          borderRadius: 30,
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>Forgot password?</Text>
      </Pressable>
    </View>
  );
};

export default ForgotPassword;
