module.exports.up = async (knex) => {
  await knex.insert({
    name: 'Strava',
    details: {
      oauth: {
        base: 'https://www.strava.com/oauth/authorize',
        scope: 'activity:read'
      }
    }
  }).into('sources');
  await knex.insert({
    name: 'Polar',
    details: {
      oauth: {
        base: 'https://flow.polar.com/oauth2/authorization',
        scope: 'accesslink.read_all'
      }
    }
  }).into('sources');
}

module.exports.down = async (knex) => {
  await knex('sources').where('name', 'Polar').del();
  await knex('sources').where('name', 'Strava').del();
}
