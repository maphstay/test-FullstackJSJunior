import express from "express";
import cors from "cors";
// import listProfitOfAllDaysController from "../controllers/listProfitOfAllDaysController.js";
// import createOrderController from "../controllers/createOrderController.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());

// /**
//  * @openapi
//  * /:
//  *   get:
//  *     description: Get all users!
//  *     responses:
//  *       200:
//  *         description: Returns a list with all users.
//  */
// router.get(`api/${process.env.API_VERSION}/users`, (_req, res) => {
//   const users = readFile();

//   return res.send(users);
// });

// /**
//  * @openapi
//  * /:
//  *   get:
//  *     description: Get a user!
//  *     responses:
//  *       200:
//  *         description: Return only specified user.
//  */
// router.get(
//   `api/${process.env.API_VERSION}/users/:user_id`,
//   checkUserInArray,
//   (req, res) => {
//     const { user_id } = req.params;
//     const users = readFile();
//     const id = users.findIndex((item) => item.id === Number(user_id));
//     const selectedUser = users[id];

//     return res.send(selectedUser);
//   }
// );

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

export { router };
