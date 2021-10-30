import express from "express";
import userController from "../controllers/userController.js";
import validation from "../helpers/general.js";

const routes = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: Auto-generated id of user
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Auto-generated date/time of registry
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Auto-generated date/time of update
 *       example:
 *         id: 1
 *         email: john.doe@gmail.com
 *         password: abc123456
 *         created_at: 2021-10-29T16:45:04.141Z
 *         updated_at: 2021-10-29T16:45:04.141Z
 */

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     description: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Number of current page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a list with all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
routes.get(`/api/${process.env.API_VERSION}/users`, userController.getAll);

/**
 * @openapi
 * /api/v1/users/{user_id}:
 *   get:
 *     description: Get a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: number
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: Return user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user not found
 *       500:
 *         description: Internal server error
 */
routes.get(
    `/api/${process.env.API_VERSION}/users/:user_id`,
    validation.checkUserExists,
    userController.getOne
);

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
routes.post(
    `/api/${process.env.API_VERSION}/users`,
    validation.checkRequire,
    validation.checkEmail,
    userController.create
);

/**
 * @openapi
 * /api/v1/users/{user_id}:
 *   put:
 *     description: Update a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: number
 *         required: true
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user not found
 *       409:
 *         description: The email already exist
 *       500:
 *         description: Internal server error
 */
routes.put(
    `/api/${process.env.API_VERSION}/users/:user_id`,
    validation.checkUserExists,
    validation.checkEmail,
    userController.update
);

/**
 * @openapi
 * /api/v1/users:
 *   delete:
 *     description: Delete all user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Return a success message
 *       500:
 *         description: Internal server error
 */
routes.delete(
    `/api/${process.env.API_VERSION}/users`,
    userController.deleteAll
);

/**
 * @openapi
 * /api/v1/users/{user_id}:
 *   delete:
 *     description: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: number
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: Return a success message
 *       404:
 *         description: The user not found
 *       500:
 *         description: Internal server error
 */
routes.delete(
    `/api/${process.env.API_VERSION}/users/:user_id`,
    validation.checkUserExists,
    userController.deleteOne
);

export { routes };
