import {BASE_URL} from './HandleApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';

const useAuth = () => {
  const config = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const [userId, setUserId] = useState(null);

  const storeUserData = async (token, userId) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userId', userId.toString());
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: config,
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        const userId = data.user_id;

        // Store user data in AsyncStorage
        await storeUserData(token, userId);

        return {token, userId};
      } else {
        console.error('Login failed: No data in the response');
        return null;
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await clearUserData();
      setUserId(null);
      console.log('User ID set to null');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getStoredUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      return {token, userId};
    } catch (error) {
      console.error('Error getting stored user data:', error);
      return null;
    }
  };

  return {
    handleLogin,
    handleLogout,
    getStoredUserData,
    getLoggedId: async () => {
      try {
        const userData = await getStoredUserData();
        console.log('User Data:', userData);
        return userData ? userData.userId : null;
      } catch (error) {
        console.error('Error getting logged ID:', error);
        return null;
      }
    },
  };
};

export default useAuth;
