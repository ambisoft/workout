const apis = {
  strava: require("../api/strava").default
};

const database = require("../middleware/database");

// Refresh expired oauth access tokens
console.log('Starting the job');

const context = {};
database(context, null, async () => {
  const { knex } = context;
  const all = await knex
    .select('*')
    .select('oauth_tokens.guid as guid')
    .select('oauth_tokens.details as details')
    .table('oauth_tokens')
    .join('sources', 'oauth_tokens.source_guid', 'sources.guid')
    .select('sources.name as source_name', 'sources.details as source_details');

  for (let i = 0; i < all.length; i++) {
    const rec = all[i];
    if (rec.details && rec.details.refresh_token) {
      const now = Math.ceil(new Date() / 1000.0);
      const expired = rec.expires_at < now;
      if (expired) {
        try {
          // TODO: only Strava for now but we can add more
          const api = apis[rec.source_name.toLowerCase()];
          const resp = await api.refresh(rec.details.refresh_token);
          const { expires_at, access_token, refresh_token } = resp.data;
          const details = { access_token, refresh_token };
          await knex('oauth_tokens')
            .update({ expires_at, details, updated_at: knex.fn.now() })
            .where({ guid: rec.guid });
        } catch (e) {
          console.log('error:', e);
        }
      }
    }
  }
  console.log('Finishing the job');
  knex.destroy();
});
