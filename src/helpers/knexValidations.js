import knex from "../database/index.js";

export default {
    async checkUserExists(user_id) {
        if (validId(user_id)) {
            const results = await knex("users").where("id", user_id);
            if (!results.length) {
                return { Message: "User not found" };
            } else {
                return results;
            }
        } else {
            return { Message: "Fill a valid user id" };
        }
    },

    async emailExist(email) {
        const results = await knex("users").where({ email });
        if (results.length) {
            return { Message: "Email already exist" };
        } else {
            return false;
        }
    },
};

const validId = (user_id) => {
    const pattern = /^\d{1,8}$/;
    return pattern.test(user_id) && user_id > 0 ? true : false;
};
