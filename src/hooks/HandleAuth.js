import axios from 'axios';

import {BASE_URL} from './HandleApis';

const useAuth = () => {
  const config = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let loggedId = null;

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/login`,
        {email, password},
        config,
      );

      if (response.status === 200) {
        const token = response.data.access_token;
        loggedId = response.data.user_id;
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
