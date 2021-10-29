module.exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("companies", t => {
    t.uuid("guid").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("name", 255).notNullable();
    t.string("domain", 255).notNullable().unique();
    t.jsonb('details');
    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    t.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
}

module.exports.down = async (knex) => {
  return knex.schema.dropTable("companies");
}
