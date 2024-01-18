import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {BASE_URL} from './HandleApis';

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const BASE_URL = 'https://e8a0-41-90-177-75.ngrok-free.app';

export const handleLogin = async (email, password, navigation) => {
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
