exports.up = (knex) => {
  return knex.schema.createTable("links", (t) => {
    t.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.text("slug").unique().notNullable();
    t.text("url").notNullable();
    t.uuid("user_id").references("users.id");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("links");
};
