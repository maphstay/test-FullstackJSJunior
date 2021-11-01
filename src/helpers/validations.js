import { passwordStrength } from "check-password-strength";
import bCrypt from "bcryptjs";

export const validations = (req) => {
    const errors = [];
    if (
        !Object.values(req.params).length &&
        (req.method === "GET" || req.method === "DELETE")
    ) {
        errors.push({ Message: "Fill an user id" });
    }
    if (!req.body.email && req.method === "POST") {
        errors.push({ Message: "Enter an email" });
    }
    if (
        (req.body.email || req.body.email === "") &&
        !validEmail(req.body.email) &&
        (req.method === "POST" || req.method === "PUT")
    ) {
        errors.push({ Message: "Enter a valid email" });
    }
    if (!req.body.password && req.method === "POST") {
        errors.push({ Message: "Enter a password" });
    }
    if (
        (req.body.password || req.body.password === "") &&
        !(passwordStrength(req.body.password).id > 0) &&
        (req.method === "POST" || req.method === "PUT")
    ) {
        errors.push({
            Message:
                "Your password is too weak! (fill a minimum length 8 chars, using uppercase, symbols and numbers)",
        });
    }
    return errors;
};

const validEmail = (email) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};

export const passwordCrypt = (password) => {
    if (password) return bCrypt.hashSync(password, 1);
    return false;
};
