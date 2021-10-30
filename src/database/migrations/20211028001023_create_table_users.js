export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("users");
}
