import knex from "../database/index.js";
import { validations, passwordCrypt } from "../helpers/requestValidations.js";
import db from "../helpers/knexValidations.js";

export default {
    async create(req, res, next) {
        try {
            const requestResult = validations(req);
            if (requestResult.length)
                return res.status(400).json(requestResult);
            const { email, password } = req.body;
            const emailExists = await db.checkEmailExists(email);
            if (emailExists) return res.status(409).json(emailExists);
            await knex("users").insert({
                email,
                password: passwordCrypt(password),
            });
            return res
                .status(201)
                .send({ Message: "User created with success" });
        } catch (error) {
            next(error);
        }
    },

    async read(req, res, next) {
        try {
            const requestResult = validations(req);
            if (!requestResult.length) {
                const userExists = await db.checkUserExists(req.params.user_id);
                return userExists.Message
                    ? res.status(400).json(userExists)
                    : res.status(200).json(userExists);
            }
            const limitPerPage = 5;
            const { page = 1 } = req.query;
            const results = await knex("users")
                .orderBy("id", "asc")
                .limit(limitPerPage)
                .offset(((page || 1) - 1) * limitPerPage);
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

    async update(req, res, next) {
        try {
            const requestResult = validations(req);
            if (requestResult.length)
                return res.status(400).json(requestResult);
            const userExists = await db.checkUserExists(req.params.user_id);
            if (userExists.Message) return res.status(400).send(userExists);
            const { email, password } = req.body;
            const {
                id,
                email: currentEmail,
                password: currentPassword,
            } = userExists[0];
            if ((email === currentEmail && !password) || (!email && !password))
                return res.status(200).send({
                    Message: "No change effects",
                });
            if (email && id) {
                const emailExists = await db.checkEmailExists(email, id);
                if (emailExists.Message)
                    return res.status(400).send(emailExists);
            }
            await knex("users")
                .update({
                    email: email ? email : currentEmail,
                    password: password
                        ? passwordCrypt(password)
                        : passwordCrypt(currentPassword),
                })
                .where("id", req.params.user_id);
            return res.status(200).send({
                Message: "Changes made successfully",
            });
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const requestResult = validations(req);
            if (!requestResult.length) {
                const userExists = await db.checkUserExists(req.params.user_id);
                if (userExists.Message) return res.status(404).json(userExists);
                await knex("users").where("id", userExists[0].id).del();
                return res.status(200).send({
                    Message: "The user have been deleted",
                });
            }
            await knex("users").del();
            return res.status(200).send({
                Message: "The all users have been deleted",
            });
        } catch (error) {
            next(error);
        }
    },
};
