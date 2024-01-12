import axios from 'axios';

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const handleLogin = async (email, password, setUserId, navigation) => {
  const BASE_URL = 'https://39af-197-232-61-198.ngrok-free.app';
  const API_URL = `${BASE_URL}/api/login`;
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

export const URL = 'https://39af-197-232-61-198.ngrok-free.app/api/';
export const FILE_BASE = 'https://39af-197-232-61-198.ngrok-free.app';

const generateUrl = endpoint => {
  return `${URL}${endpoint}`;
};

export const sermonsUrl = generateUrl('fetchSermons');
export const sermonNotesUrl = generateUrl('fetchSermonnotes');
export const announcementsUrl = generateUrl('fetchAnnouncements');
