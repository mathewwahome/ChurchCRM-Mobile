import axios from 'axios';

import { BASE_URL } from './HandleApis';
const useAuth = () => {

  const config = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let loggedId = null

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/login`,
        { email, password },
        config,
      );

      // console.log('API Response:', response);

      if (response.status == 200) {
        // Handle successful login
        const token = response.data.token;
        loggedId = response.data.userId;
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
    getLoggedId: () => loggedId,
  };
};

export default useAuth;
