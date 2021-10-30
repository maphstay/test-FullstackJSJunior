import express from "express";
import userController from "../controllers/userController.js";
import validation from "../helpers/validations.js";
const routesPost = express.Router();

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     description: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Fill all fields
 *       409:
 *         description: The email already exist
 *       500:
 *         description: Internal server error
 */
routesPost.post(
    `/api/${process.env.API_VERSION}/users`,
    validation.checkRequire,
    validation.checkEmail,
    userController.create
);

export { routesPost };
