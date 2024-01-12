import axios from 'axios';

export const BASE_URL = 'https://39af-197-232-61-198.ngrok-free.app';
export const API_URL = `${BASE_URL}/api/login`;
const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const handleLogin = async (email, password, setUserId, navigation) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      email,
      password,
    });
    const token = response.data.token;
    const loggedId = response.data.userId;
    setUserId(loggedId);
    navigation.navigate('MainContainer');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
