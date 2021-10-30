import express from "express";
import userController from "../controllers/userController.js";
import validation from "../helpers/validations.js";
const routesDelete = express.Router();

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
routesDelete.delete(
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
routesDelete.delete(
    `/api/${process.env.API_VERSION}/users/:user_id`,
    validation.checkUserExists,
    userController.deleteOne
);

export { routesDelete };
