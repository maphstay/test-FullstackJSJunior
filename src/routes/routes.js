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
