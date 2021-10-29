const axios = require('axios').default;
const url = require('url');

const Polar = {
  authorize(code, redirect_uri) {
    const endpoint = 'https://polarremote.com/v2/oauth2/token';
    const client_id = process.env.REACT_APP_POLAR_CLIENT_ID;
    const client_secret = process.env.REACT_APP_POLAR_CLIENT_SECRET;
    const grant_type = 'authorization_code';

    const clients = `${client_id}:${client_secret}`;
    const encoded = Buffer.from(`${clients}`).toString('base64');

    const params = new url.URLSearchParams({ code, grant_type, redirect_uri });
    const config = {
      headers: {
        'Authorization': `Basic ${encoded}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json;charset=UTF-8'
      }
    };

    const options = {};
    const client = axios.create(options);
    return client.post(endpoint, params.toString(), config);
  },

  activities(access_token, user_id) {
    const options = {};
    const client = axios.create(options);
    const config = {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json;charset=UTF-8'
      }
    };
    const endpoint = `https://www.polaraccesslink.com/v3/users/${user_id}/activity-transactions`;
    return client.post(endpoint, {}, config);
  },

  exercises(access_token, user_id) {
    const options = {};
    const client = axios.create(options);
    const config = {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json;charset=UTF-8'
      }
    };
    const endpoint = `https://www.polaraccesslink.com/v3/exercises`;
    return client.get(endpoint, config);
  },

  registerUser(access_token, user_id) {
    const options = {};
    const client = axios.create(options);
    const config = {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json;charset=UTF-8'
      }
    };
    const endpoint = `https://www.polaraccesslink.com/v3/users/`;
    const params = { 'member-id': user_id };
    return client.post(endpoint, params, config);
  }
};


module.exports.default = Polar;
