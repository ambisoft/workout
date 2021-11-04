class OauthTokens {
  constructor(knex) {
    this.knex = knex;
  }

  async findBy(where) {
    const result = await this.knex
      .select('*')
      .table('oauth_tokens')
      .where(where)
      .first();
    return result;
  }

  async findAllWithSources() {
    const all = await this.knex
      .select('*')
      .select('oauth_tokens.guid as guid')
      .select('oauth_tokens.details as details')
      .table('oauth_tokens')
      .join('sources', 'oauth_tokens.source_guid', 'sources.guid')
      .select('sources.name as source_name', 'sources.details as source_details');
    return all;
  }

  async update(where, data) {
    return await this.knex('oauth_tokens')
      .update({...data, updated_at: this.knex.fn.now() });
  }

  async upsert(where) {
    const exists = await this.findBy(where);
    if (exists) {
      await this.knex('oauth_tokens').update(record).where({ guid: exists.guid });
    } else {
      await this.knex.insert({...where, ...record}).into('oauth_tokens');
    }
  }
};

module.exports.default = OauthTokens;
