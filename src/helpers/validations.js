import knex from "../database/index.js";

export default {
    checkRequire(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ Message: "Fill all fields" });
        }
        return next();
    },

    async checkEmail(req, res, next) {
        const { email } = req.body;
        if (email) {
            const results = await knex("users").where({ email });
            if (results.length) {
                return res.status(409).send({ Message: "Email already exist" });
            }
        }
        next();
    },

    async checkUserExists(req, res, next) {
        const { user_id } = req.params;
        const results = await knex("users").where("id", user_id);
        if (!results.length) {
            return res.status(404).send({ Message: "User not found" });
        }
        next();
    },
};
