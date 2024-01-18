import axios from 'axios';
import {BASE_URL} from './HandleApis';

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const handleRegister = async (
  name,
  email,
  phone,
  password,
  navigation,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, {
      name,
      email,
      phone,
      password,
    });
    if (response && response.data) {
      const token = response.data.token;
      navigation.navigate('LoginScreen');
    } else {
      console.error('Registration failed: No data in the response');
    }
  } catch (error) {
    console.error('Registration failed:', error.message || error);
  }
};
