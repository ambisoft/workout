const auth = require("../../middleware/auth");
const api = require('../../../src/api/Strava').default;

const strava = (app) => {
  app.post("/api/connect/strava/authorize", auth, async (req, res) => {
    const code = req.body.code;
    try {
      const resp = await api.authorize(code);
      if (resp && resp.data) {
        const { athlete, expires_at, access_token, refresh_token } = resp.data;
        if (access_token) {
          const source = await req.knex
            .select('guid')
            .table('sources')
            .where({ name: 'Strava' })
            .first();
          const record = {
            expires_at,
            details: { access_token, refresh_token }
          };
          const where = { user_guid: req.user.guid, source_guid: source.guid };
          const exists = await req.knex
            .select('*')
            .table('oauth_tokens')
            .where(where)
            .first();
          console.log('exists:', exists);
          if (exists) {
            console.log('update!');
            await req.knex('oauth_tokens').update(record).where({ guid: exists.guid });
          } else {
            console.log('insert!');
            await req.knex.insert({...where, ...record}).into('oauth_tokens');
          }
        }
        if (athlete) {
        }
        res.send({ status: 'ok' });
      }
    } catch (e) {
      console.log('error:', e);
    }
    // TODO: store source_profile, if did not exist
  });
};

module.exports.default = strava;
