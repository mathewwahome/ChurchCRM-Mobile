const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const BASE_URL = 'https://bf7f-41-139-245-235.ngrok-free.app';

export const URL = `${BASE_URL}/api/`;

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
