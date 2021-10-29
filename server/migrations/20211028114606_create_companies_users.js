module.exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("companies_users", t => {
    t.uuid("guid").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.uuid("user_guid").notNullable().references("guid").inTable('users');
    t.uuid("company_guid").notNullable().references("guid").inTable('companies');
    t.jsonb('details');
    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    t.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    t.unique(['user_guid', 'company_guid']);
  });
}

module.exports.down = async (knex) => {
  return knex.schema.dropTable("companies_users");
}
