const auth = require("../../middleware/auth");
const api = require('../../api/strava').default;

const Activities = require('../../models/activities').default;
const Sources = require('../../models/sources').default;
const OauthTokens = require('../../models/oauthTokens').default;

const strava = (app) => {
  app.post("/api/connect/strava/authorize", auth, async (req, res) => {
    const code = req.body.code;
    try {
      const resp = await api.authorize(code);
      if (resp && resp.data) {
        const { athlete, expires_at, access_token, refresh_token } = resp.data;
        if (access_token) {
          const source = new Sources(req.knex).findBy({ name: 'Strava' });
          const details = { access_token, refresh_token };
          const where = { user_guid: req.user.guid, source_guid: source.guid };
          const record = { expires_at, details };
          new OauthTokens(req.knex).upsert(where, record);
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

  app.get("/api/connect/strava/activities", auth, async (req, res) => {
    const tokens = new OauthTokens(req.knex);
    const source = await (new Sources(req.knex).findBy({ name: 'Strava' }));
    const where = { user_guid: req.user.guid, source_guid: source.guid };
    const oauth_token = await tokens.findBy(where);
    if (!oauth_token) {
      res.send({ status: 'no_token' });
    } else {
      let access_token, refresh_token, expires_at;
      ({ access_token, refresh_token } = oauth_token.details);
      const now = Math.ceil(new Date() / 1000.0);
      const expired = oauth_token.expires_at < now;
      if (expired) {
          const resp = await api.refresh(refresh_token);
          ({ expires_at, access_token, refresh_token } = resp.data);
          const details = { access_token, refresh_token };
          await tokens.update({ guid: oauth_token.guid }, { expires_at, details });
      }
      try {
        const resp = await api.activities(access_token);
        if (resp && resp.data) {
          const activities = new Activities(req.knex);
          const records = resp.data || [];
          const results = [];
          for (let i = 0; i < records.length; i++) {
            const activity = records[i];
            const source_guid = source.guid;
            const user_guid = req.user.guid;
            const external_id = activity.id;
            const exists = await activities.findBy({ source_guid, user_guid, external_id });
            if (exists) {
              results.push(exists);
            } else {
              const local = {
                source_guid,
                user_guid,
                external_id,
                name: activity.name,
                details: activity
              };
              results.push(await activities.insert(local));
            }
          }
          res.send({ status: 'ok', data: results });
        } else {
          res.status(500).send({ error: 'empty response' });
        }
      } catch (e) {
          res.status(500).send({ error: 'try again' });
      }
    }
  });
};

module.exports.default = strava;
