class Activities {
  constructor(knex) {
    this.knex = knex;
  }

  async findBy(where) {
    const result = await this.knex
      .select('*')
      .table('activities')
      .where(where)
      .first();
    return result;
  }

  async insert(record) {
    try {
      return (await this.knex('activities').insert(record).returning('*'))[0];
    } catch (e) {
      return null;
    }
  }
};

module.exports.default = Activities;
