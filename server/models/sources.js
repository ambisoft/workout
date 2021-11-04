class Sources {
  constructor(knex) {
    this.knex = knex;
  }

  async findBy(where) {
    const source = await this.knex
      .select('*')
      .table('sources')
      .where(where)
      .first();
    return source;
  }
};

module.exports.default = Sources;
