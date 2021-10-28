import path from "path";
const __dirname = path.join(path.resolve());

export default {
  development: {
    client: "pg",
    connection: {
      database: "contele",
      user: "admin",
      password: "12345",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
  },
};
