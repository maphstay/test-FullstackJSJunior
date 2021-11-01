import express from "express";
import userController from "../controllers/userController.js";
const routesPut = express.Router();

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
routesPut.put(
    `/api/${process.env.API_VERSION}/users/:user_id`,
    userController.update
);

export { routesPut };
