const axios = require('axios').default;

const Tokens = require('./Tokens').default;

const local = window.location.origin.includes('localhost');
const API_URL = local ? 'http://localhost:3001/api' : '/api';

const Client = () => {
  const options = { baseURL: API_URL };
  const client = axios.create(options);
  const token = Tokens.get('workouts_token');
  client.interceptors.request.use(request => {
    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`;
    }
    return request;
  });
  return client;
};

module.exports.default = Client;
