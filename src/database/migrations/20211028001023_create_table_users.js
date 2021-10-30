import knexfile from "../../../knexfile.js";

export async function up(knex) {
    return await knex.schema
        .createTable("users", (table) => {
            table.increments("id");
            table.string("email").unique().notNullable();
            table.string("password").notNullable();
            table.timestamps(true, true);
        })
        .then(() => knex.raw(knexfile.onUpdateTrigger("users")));
}

export async function down(knex) {
    return await knex.schema.dropTable("users");
}
