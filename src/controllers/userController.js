import knex from "../database/index.js";

export default {
  async index(_req, res) {
    const results = await knex("users");
    return res.json(results);
  },
};
