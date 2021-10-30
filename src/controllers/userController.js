import knex from "../database/index.js";

export default {
    async getAll(req, res, next) {
        try {
            const limitPerPage = 5;
            const { page = 1 } = req.query;
            const results = await knex("users")
                .limit(limitPerPage)
                .offset(((page || 1) - 1) * limitPerPage);
            if (!results.length) return res.status(200).json(results);
            const [count] = await knex("users").count();
            return res.status(200).json({
                currentPage: Number(page) || 1,
                perPage: limitPerPage,
                totalUsers: Number(count["count"]),
                lastPage: Math.ceil(Number(count["count"]) / limitPerPage),
                data: results,
            });
        } catch (error) {
            next(error);
        }
    },

    async getOne(req, res, next) {
        try {
            const { user_id } = req.params;
            const results = await knex("users").where("id", user_id);
            if (!results.length)
                return res.status(404).json({ Message: "User not found" });
            return res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const { email, password } = req.body;
            await knex("users").insert({ email, password });
            return res
                .status(201)
                .send({ Message: "User created with success" });
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const { user_id } = req.params;
            const { email, password } = req.body;
            await knex("users")
                .update({ email, password })
                .where("id", user_id);
            return res.send({
                Message: "Changes made successfully",
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteAll(_req, res, next) {
        try {
            await knex("users").del();
            return res.send({
                Message: "The all users have been deleted",
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteOne(req, res, next) {
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
