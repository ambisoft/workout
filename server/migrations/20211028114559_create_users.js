module.exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("users", t => {
    t.uuid("guid").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.string("username", 255).notNullable().unique();
    t.string("password", 255);
    t.string("first_name", 255);
    t.string("last_name", 255);
    t.string("profile_image_url", 255);
    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    t.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
}

module.exports.down = async (knex) => {
  return knex.schema.dropTable("users");
}
