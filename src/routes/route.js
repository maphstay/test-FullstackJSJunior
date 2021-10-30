import express from "express";
import userController from "../controllers/userController.js";

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
 *     responses:
 *       200:
 *         description: Returns a list with all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
routes.get(`/api/${process.env.API_VERSION}/users`, userController.listAll);

/**
 * @openapi
 * /api/v1/users/{user_id}:
 *   get:
 *     description: Get a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: The user wasn't found
 */
routes.get(
  `/api/${process.env.API_VERSION}/users/:user_id`,
  userController.list
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
 *       500:
 *         description: Internal server error
 */
routes.post(`/api/${process.env.API_VERSION}/users`, userController.create);

/**
 * @openapi
 * /api/v1/users/{user_id}:
 *   put:
 *     description: Update a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
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
 *       500:
 *         description: Internal server error
 */
routes.put(
  `/api/${process.env.API_VERSION}/users/:user_id`,
  userController.update
);

/**
 * @openapi
 * /:
 *   delete:
 *     description: Delete all user!
 *     responses:
 *       200:
 *         description: Return a success message.
 */
routes.delete(
  `/api/${process.env.API_VERSION}/users/:user_id`,
  userController.delete
);

// /**
//  * @openapi
//  * /:
//  *   delete:
//  *     description: Delete a user!
//  *     responses:
//  *       200:
//  *         description: Return a success message.
//  */
// router.delete(
//   `api/${process.env.API_VERSION}/users/:user_id`,
//   checkUserInArray,
//   (req, res) => {
//     const { user_id } = req.params;
//     const users = readFile();
//     const user = users.findIndex((item) => item.id === Number(user_id));
//     users.splice(user, 1);
//     writeFile(users);

//     return res.send({ Message: "The user have been deleted!" });
//   }
// );

export { routes };
