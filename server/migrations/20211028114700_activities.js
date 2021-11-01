module.exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("activities", t => {
    t.uuid("guid").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.uuid("user_guid").notNullable().references("guid").inTable('users');
    t.uuid("source_guid").notNullable().references("guid").inTable('sources');
    t.string("name").notNullable();
    t.integer("timestamp").notNullable();
    t.jsonb('details');
    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    t.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    t.unique(['source_guid', 'user_guid']);
  });
}

module.exports.down = async (knex) => {
  return knex.schema.dropTable("activities");
}
