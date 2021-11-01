import knex from "../database/index.js";
import { validations } from "../helpers/validations.js";
import db from "../helpers/knexValidations.js";
import { passwordCrypt } from "../helpers/validations.js";

export default {
    async create(req, res, next) {
        try {
            const requestResult = validations(req);
            if (requestResult.length) {
                return res.status(400).json(requestResult);
            } else {
                const { email, password } = req.body;
                const dbResult = await db.emailExist(email);
                if (!dbResult) {
                    await knex("users").insert({
                        email,
                        password: passwordCrypt(password),
                    });
                    return res
                        .status(201)
                        .send({ Message: "User created with success" });
                } else {
                    return res.status(409).json(dbResult);
                }
            }
        } catch (error) {
            next(error);
        }
    },

    async read(req, res, next) {
        try {
            const requestResult = validations(req);

            if (requestResult.length) {
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
            } else {
                const dbResult = await db.checkUserExists(req.params.user_id);

                if (dbResult.Message) {
                    return res.status(400).json(dbResult);
                } else {
                    return res.status(200).json(dbResult);
                }
            }
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const requestResult = validations(req);

            if (requestResult.length)
                return res.status(400).json(requestResult);

            const dbResult1 = await db.checkUserExists(req.params.user_id);

            if (dbResult1.Message) return res.status(400).send(dbResult1);

            const { email, password } = req.body;
            const { email: currentEmail, password: currentPassword } =
                dbResult1[0];
            if (email) {
                const dbResult2 = await db.emailExist(email);
                if (dbResult2.Message) return res.status(400).send(dbResult2);
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

            if (requestResult.length) {
                await knex("users").del();
                return res.status(200).send({
                    Message: "The all users have been deleted",
                });
            } else {
                const dbResult = await db.checkUserExists(req.params.user_id);
                if (dbResult.Message) {
                    return res.status(404).json(dbResult);
                } else {
                    await knex("users").where("id", dbResult[0].id).del();
                    return res.status(200).send({
                        Message: "The user have been deleted",
                    });
                }
            }
        } catch (error) {
            next(error);
        }
    },
};
