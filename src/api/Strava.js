const Client = require('./Client').default;

const Strava = {
  activities() {
    const client = Client();
    return client.get('/connect/strava/activities');
  },

};

module.exports.default = Strava;
