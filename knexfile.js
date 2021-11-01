import path from "path";
const __dirname = path.join(path.resolve());

export default {
    development: {
        client: "pg",
        connection: {
            // host: "db",
            // port: 5432,
            database: "contele",
            user: "admin",
            password: "12345",
        },
        migrations: {
            tableName: "knex_migrations",
            directory: `${__dirname}/src/database/migrations`,
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`,
        },
    },
    onUpdateTrigger: (table) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp()
    `,
};
