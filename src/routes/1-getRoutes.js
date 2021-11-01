import express from "express";
import userController from "../controllers/userController.js";
const routesGet = express.Router();

// const routes = express.Router();

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
routesGet.get(`/api/${process.env.API_VERSION}/users`, userController.read);

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
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
routesGet.get(
    `/api/${process.env.API_VERSION}/users/:user_id`,
    userController.read
);

export { routesGet };
