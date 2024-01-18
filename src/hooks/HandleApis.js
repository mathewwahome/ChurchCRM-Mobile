import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const BASE_URL = 'https://e8a0-41-90-177-75.ngrok-free.app';

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
