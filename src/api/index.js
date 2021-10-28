import axios from 'axios';

const Api = {

  ping() {
    const local = window.location.origin.includes('localhost');
    const API_URL = local ? 'http://localhost:3001/api' : '/api';
    const options = { baseURL: API_URL };
    const client = axios.create(options);
    client.get('ping').then(resp => {
    });
  },

  Strava: {
    authorize(code) {
      const options = {};
      const client = axios.create(options);
      const url = 'https://www.strava.com/oauth/token';
      const client_id = process.env.REACT_APP_STRAVA_CLIENT_ID;
      const client_secret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
      const grant_type = 'authorization_code';
      const params = { client_id, client_secret, code, grant_type };
      return client.post(url, params);
    },

    activities(access_token) {
      const options = {};
      const client = axios.create(options);
      const config = {
        headers: {
          authorization: `Bearer ${access_token}`
        }
      };
      const url = 'https://www.strava.com/api/v3/athlete/activities';
      return client.get(url, config);
    }
  }
}

export default Api;
