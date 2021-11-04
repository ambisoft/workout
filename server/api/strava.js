const axios = require('axios').default;

const API_BASE = 'https://www.strava.com/api/v3';

const Strava = {
  authorize(code) {
    const client = axios.create({});
    const url = `${API_BASE}/oauth/token`;
    const client_id = process.env.REACT_APP_STRAVA_CLIENT_ID;
    const client_secret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
    const grant_type = 'authorization_code';
    const params = { client_id, client_secret, code, grant_type };
    return client.post(url, params);
  },

  refresh(refresh_token) {
    const client = axios.create({});
    const url = `${API_BASE}/oauth/token`;
    const client_id = process.env.REACT_APP_STRAVA_CLIENT_ID;
    const client_secret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
    const grant_type = 'refresh_token';
    const params = { client_id, client_secret, grant_type, refresh_token };
    return client.post(url, params);
  },

  activities(access_token) {
    const url = `${API_BASE}/athlete/activities`;
    const client = axios.create({});
    const headers = { authorization: `Bearer ${access_token}` };
    const config = { headers };
    return client.get(url, config);
  }
};

module.exports.default = Strava;
