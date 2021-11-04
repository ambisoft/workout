const apis = {
  polar: require("../api/polar").default,
  strava: require("../api/strava").default
};

const database = require("../middleware/database");
const OauthTokens = require('../models/oauthTokens').default;

// Refresh expired oauth access tokens
console.log('Starting the job');

const context = {};
database(context, null, async () => {
  const { knex } = context;

  const tokens = new OauthTokens(knex);
  const all = await tokens.findAllWithSources();

  for (let i = 0; i < all.length; i++) {
    const rec = all[i];
    if (rec.details && rec.details.refresh_token) {
      const now = Math.ceil(new Date() / 1000.0);
      const expired = rec.expires_at < now;
      if (expired) {
        try {
          const api = apis[rec.source_name.toLowerCase()];
          const resp = await api.refresh(rec.details.refresh_token);
          const { expires_at, access_token, refresh_token } = resp.data;
          const details = { access_token, refresh_token };
          await tokens.update({ guid: rec.guid }, { expires_at, details });
        } catch (e) {
          console.log('error:', e);
        }
      }
    }
  }
  console.log('Finishing the job');
  knex.destroy();
});
