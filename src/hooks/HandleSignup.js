import {BASE_URL} from './HandleApis';
import axios from 'axios';

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const handleRegister = async (name, email, phone, password, loggedId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/register/app_user`, {
      name,
      email,
      phone,
      password,
    });
    if (response && response.data) {
      const token = response.data.token;
      const loggedId = response.data.userId;
      console.log(`The token: ${token}\nThe user ID: ${loggedId}`);
    } else {
      console.error('Registration failed: No data in the response');
    }
  } catch (error) {
    console.error('Registration failed:', error.message || error);
  }
};

export default handleRegister;
