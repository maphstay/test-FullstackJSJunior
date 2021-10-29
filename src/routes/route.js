import express from "express";
import cors from "cors";
import userController from "../controllers/userController.js";

const routes = express.Router();
routes.use(express.urlencoded({ extended: true }));
routes.use(express.json());
routes.use(cors());

/**
 * @openapi
 * components:
 *     schemas:
 *         User:
 *             type: object
 *             required:
 *                 - email
 *                 - password
 *             properties:
 *                 id:
 *                     type: number
 *                     description: Auto-generated id of user
 *                 email:
 *                     type: string
 *                     description: The user's email
 *                 password:
 *                     type: string
 *                     description: The user's password
 *                 created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Auto-generated date/time of registry
 *                 updated_at:
 *                     type: string
 *                     format: date-time
 *                     description: Auto-generated date/time of update
 *             example:
 *                 id: 1
 *                 email: john.doe@gmail.com
 *                 password: abc123456
 *                 created_at: 2021-10-29T16:45:04.141Z
 *                 updated_at: 2021-10-29T16:45:04.141Z
 */

/**
 * @openapi
 * tags:
 *     name: Users
 *     description: The users managing API
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
 *             application/json:
 *                 schema:
 *                     type: array
 *                     items:
 *                         $ref: '#/components/schemas/User'
 */
routes.get(
  `/api/${process.env.API_VERSION}/users`,
  userController.listAllUsers
);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     description: Get a user
 *     tags: [Users]
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *               type: string
 *           required: true
 *           description: User id
 *     responses:
 *       200:
 *         description: Return user description by id
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *           description: The user wasn't found
 */
routes.get(
  `/api/${process.env.API_VERSION}/users/:id`,
  userController.listUser
);

// /**
//  * @openapi
//  * /:
//  *   post:
//  *     description: Create a new user!
//  *     responses:
//  *       200:
//  *         description: Return a success message.
//  */
// router.post(
//   `api/${process.env.API_VERSION}/users`,
//   checkRequire,
//   checkEmail,
//   (req, res) => {
//     const { email, senha } = req.body;
//     const users = readFile();
//     const id = users.length + 1;
//     users.push({ id, email, senha });
//     writeFile(users);

//     return res.send({ Message: "User registered success!" });
//   }
// );

// /**
//  * @openapi
//  * /:
//  *   put:
//  *     description: Modify a specified user!
//  *     responses:
//  *       200:
//  *         description: Return a user modified.
//  */
// router.put(
//   `api/${process.env.API_VERSION}/users/:user_id`,
//   checkUserInArray,
//   checkModifications,
//   checkEmail,
//   (req, res) => {
//     const { user_id } = req.params;
//     const { email, senha } = req.body;

//     const users = readFile();
//     const user = users.findIndex((item) => item.id === Number(user_id));

//     const { id, email: updEmail, senha: updsenha } = users[user];

//     const newUser = {
//       id: id,
//       email: email ? email : updEmail,
//       senha: senha ? senha : updsenha,
//     };

//     users[user] = newUser;
//     writeFile(users);

//     return res.send({ Message: "Changes made successfully", id, email, senha });
//   }
// );

// /**
//  * @openapi
//  * /:
//  *   delete:
//  *     description: Delete all user!
//  *     responses:
//  *       200:
//  *         description: Return a success message.
//  */
// router.delete(`api/${process.env.API_VERSION}/users/`, (_req, res) => {
//   const users = [];
//   writeFile(users);
//   return res.send({ Message: "All users have been deleted!" });
// });

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
