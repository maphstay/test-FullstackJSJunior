import knex from "../database/index.js";

export default {
  async listAllUsers(_req, res) {
    const results = await knex("users");
    return res.status(200).json(results);
  },

  async listUser(req, res) {
    const { id } = req.params;
    const results = await knex("users").where("id", id);
    console.log(results.length);
    if (!results.length)
      return res.status(404).json({ Message: "User not found" });
    return res.status(200).json(results);
  },

  async createUser(_req, res) {
    const results = await knex("users");
    return res.status(200).json(results);
  },
};
