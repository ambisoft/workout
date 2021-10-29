const axios = require('axios').default;

const Polar = require('./Polar').default;
const Strava = require('./Strava').default;

const local = window.location.origin.includes('localhost');
const API_URL = local ? 'http://localhost:3001/api' : '/api';

const Api = {
  ping() {
    const options = { baseURL: API_URL };
    const client = axios.create(options);
    client.get('ping').then(resp => {
    });
  },
  local: {
    Polar: {
      authorize(code, redirect_uri) {
        const options = { baseURL: API_URL };
        const client = axios.create(options);
        return client.post('/connect/polar/authorize', { code, redirect_uri });
      },
      activities(access_token, user_id) {
        const options = { baseURL: API_URL };
        const client = axios.create(options);
        return client.post('/connect/polar/activities', { access_token, user_id });
      },
      exercises(access_token) {
        const options = { baseURL: API_URL };
        const client = axios.create(options);
        return client.post('/connect/polar/exercises', { access_token });
      },
    }
  },
  Polar,
  Strava
}

module.exports = Api;
