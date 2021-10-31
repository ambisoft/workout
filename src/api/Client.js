const axios = require('axios').default;

const local = window.location.origin.includes('localhost');
const API_URL = local ? 'http://localhost:3001/api' : '/api';

const Client = () => {
  const options = { baseURL: API_URL };
  const client = axios.create(options);
  return client;
};

module.exports = Client;
