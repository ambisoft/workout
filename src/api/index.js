const Client = require('./Client').default;
const Polar = require('./Polar').default;
const Strava = require('./Strava').default;
const Tokens = require('./Tokens').default;

const Api = {

  error(e) {
    if (e.response) {
      const data = e.response.data || {};
      return data.error || undefined;
    } else {
      return undefined;
    }
  },

  ping() {
    const client = Client();
    client.get('ping');
  },

  sources() {
    const client = Client();
    return client.get('sources').then(resp => resp.data);
  },

  users: {
    create(username, password) {
      const client = Client();
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
      const client = Client();
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
    const token = Tokens.get('workouts_token');
    if (!token) {
      return Promise.resolve(null);
    }
    const client = Client();
    return client.get('/me').then(resp => resp.data).catch(e => {
      if ((/invalid/i).test(Api.error(e))) {
        Tokens.clear();
      }
      return null;
    });
  },

  local: {
    Polar: {
      authorize(code, redirect_uri) {
        const client = Client();
        return client.post('/connect/polar/authorize', { code, redirect_uri });
      },
      // TODO: move me to the server
      activities(access_token, user_id) {
        const client = Client();
        return client.post('/connect/polar/activities', { access_token, user_id });
      },
      // TODO: move me to the server
      exercises(access_token) {
        const client = Client();
        return client.post('/connect/polar/exercises', { access_token });
      },
    },
  },
  Polar,
  Strava
}

module.exports = Api;
