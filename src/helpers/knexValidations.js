import knex from "../database/index.js";

export default {
    async checkUserExists(user_id) {
        if (!validId(user_id)) return { Message: "Fill a valid user id" };
        const results = await knex("users").where("id", user_id);
        if (results.length) return results;
        return { Message: "User not found" };
    },

    async checkEmailExists(email, id) {
        const results = await knex("users")
            .where({ email })
            .andWhereNot("id", id || null);
        if (!results.length) return false;
        return { Message: "Email already exist" };
    },
};

const validId = (user_id) => {
    const pattern = /^\d{1,8}$/;
    return pattern.test(user_id) && user_id > 0 ? true : false;
};
