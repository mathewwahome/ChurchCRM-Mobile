import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import {BASE_URL} from './HandleApis';
const useAuth = () => {
  const navigation = useNavigation();

  const config = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const handleLogin = async (email, password) => {
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

  return {
    handleLogin,
  };
};

export default useAuth;
