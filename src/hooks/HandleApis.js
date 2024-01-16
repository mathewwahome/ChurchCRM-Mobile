import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const BASE_URL = 'http://karencommunitychurch.org:8089';
export const FILE_BASE = BASE_URL;

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
      navigation.navigate('MainContainer');
    } else {
      console.error('Registration failed: No data in the response');
    }
  } catch (error) {
    console.error('Registration failed:', error.message || error);
  }
};

const URL = `${BASE_URL}/api/`;

const fetchData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const fetchDataByEndpoint = async endpoint => {
  const url = `${URL}${endpoint}`;
  return fetchData(url);
};
