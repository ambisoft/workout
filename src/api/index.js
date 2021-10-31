const axios = require('axios').default;

const Client = require('./Client').default;
const Polar = require('./Polar').default;
const Strava = require('./Strava').default;
const Tokens = require('./Tokens').default;

const local = window.location.origin.includes('localhost');
const API_URL = local ? 'http://localhost:3001/api' : '/api';

const Api = {
  ping() {
    const client = Client();
    client.get('ping').then(resp => {
    });
  },

  users: {
    create(username, password) {
      const options = { baseURL: API_URL };
      const client = axios.create(options);
      return client.post('/users', { username, password }).then(resp => {
        const { token } = resp.data;
        if (token) {
          Tokens.set(token);
        }
        return resp.data;
      });
    }
  },

  sessions: {
    create(username, password) {
      const options = { baseURL: API_URL };
      const client = axios.create(options);
      return client.post('/sessions', { username, password }).then(resp => {
        const { token } = resp.data;
        if (token) {
          Tokens.set(token);
        }
        return resp.data;
      });
    }
  },

  me() {
    // TODO: extract "client"
    const options = { baseURL: API_URL };
    const client = axios.create(options);
    client.interceptors.request.use(request => {
      const token = Tokens.get('workouts_token');
      if (token) {
        request.headers.common.Authorization = `Bearer ${token}`;
      }
      return request;
    });
    return client.get('/me').then(resp => resp.data).catch(e => null);
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
