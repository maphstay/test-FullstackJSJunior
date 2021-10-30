import knex from "../database/index.js";

export default {
  async listAll(_req, res) {
    const results = await knex("users");
    return res.status(200).json(results);
  },

  async list(req, res) {
    const { user_id } = req.params;
    const results = await knex("users").where("id", user_id);
    if (!results.length)
      return res.status(404).json({ Message: "User not found" });
    return res.status(200).json(results);
  },

  async create(req, res, next) {
    try {
      const { email, password } = req.body;
      await knex("users").insert({ email, password });
      return res.status(201).send({ Message: "User created with success" });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { user_id } = req.params;
      const { email, password } = req.body;

      await knex("users").update({ email, password }).where("id", user_id);
      return res.send({
        Message: "Changes made successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { user_id } = req.params;

      await knex("users").where("id", user_id).del();
      return res.send({
        Message: "The user have been deleted",
      });
    } catch (error) {
      next(error);
    }
  },
};

// checkUserInArray,
//   checkModifications,
//   checkEmail,
//   (req, res) => {
//
//     const { email, senha } = req.body;

//     const users = readFile();
//     const user = users.findIndex((item) => item.id === Number(user_id));

//     const { id, email: updEmail, senha: updsenha } = users[user];

//     const newUser = {
//       id: id,
//       email: email ? email : updEmail,
//       senha: senha ? senha : updsenha,
//     };

//     users[user] = newUser;
//     writeFile(users);

//     return res.send({ Message: "Changes made successfully", id, email, senha });
//   };

// , (_req, res) => {
//   const users = [];
//   writeFile(users);
//   return res.send({ Message: "All users have been deleted!" });
// }
