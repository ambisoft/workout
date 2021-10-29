module.exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("sources", t => {
    t.uuid("guid").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("name", 255);
    t.jsonb('details');
    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    t.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
}

module.exports.down = async (knex) => {
  return knex.schema.dropTable("sources");
}
