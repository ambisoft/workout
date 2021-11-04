const Client = require('./Client').default;

const Strava = {
  activities() {
    const client = Client();
    return client.get('/connect/strava/activities').then(resp => resp.data);
  },
  authorize(code, redirect_uri) {
    const client = Client();
    return client.post('/connect/strava/authorize', { code, redirect_uri });
  },
};

module.exports.default = Strava;
