exports.up = (knex) => {
  return knex.schema.createTable("users", (t) => {
    t.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.text("email").unique().notNullable();
    t.text("username").unique().notNullable();
    t.text("password").notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("users");
};
