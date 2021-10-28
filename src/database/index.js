import knexfile from "../../knexfile";
export const knex = require("knex")(knexfile["development"]);
