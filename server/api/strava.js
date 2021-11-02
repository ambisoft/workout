const axios = require('axios').default;

const Strava = {
  authorize(code) {
    const client = axios.create({});
    const url = 'https://www.strava.com/api/v3/oauth/token';
    const client_id = process.env.REACT_APP_STRAVA_CLIENT_ID;
    const client_secret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
    const grant_type = 'authorization_code';
    const params = { client_id, client_secret, code, grant_type };
    return client.post(url, params);
  },

  refresh(refresh_token) {
    const client = axios.create({});
    const url = 'https://www.strava.com/api/v3/oauth/token';
    const client_id = process.env.REACT_APP_STRAVA_CLIENT_ID;
    const client_secret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
    const grant_type = 'refresh_token';
    const params = { client_id, client_secret, grant_type, refresh_token };
    return client.post(url, params);
  }
};

module.exports.default = Strava;
