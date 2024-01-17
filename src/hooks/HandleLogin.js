import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { BASE_URL } from './HandleApis';

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const handleLogin = async (email, password, setUserId, navigation) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email,
      password,
    });
    const token = response.data.token;
    const loggedId = response.data.userId;
    setUserId(loggedId);
    navigation.navigate('MainContainer');
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
