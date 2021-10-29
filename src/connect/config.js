const Config = {
  STRAVA: {
    base: 'https://www.strava.com/oauth/authorize',
    client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
    redirect_uri: `${window.location.origin}/connect/strava`,
    scope: 'activity:read'
  },

  POLAR: {
    base: 'https://flow.polar.com/oauth2/authorization',
    client_id: process.env.REACT_APP_POLAR_CLIENT_ID,
    redirect_uri: `${window.location.origin}/connect/polar`,
    scope: 'accesslink.read_all'
  }
};

export default Config;
