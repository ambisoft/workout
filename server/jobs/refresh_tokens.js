const database = require("../middleware/database");

// Refresh expiring oauth access tokens
console.log('Starting the job');

const context = {};
database(context, null, async () => {
  const { knex } = context;
  const all = await knex
    .select('*')
    .table('oauth_tokens')
    .join('sources', 'oauth_tokens.source_guid', 'sources.guid')
    .select('sources.name as source_name', 'sources.details as source_details');

  for (let i = 0; i < all.length; i++) {
  }
  console.log('Finishing the job');
  knex.destroy();
});
