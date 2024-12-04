const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const authenticateToken = require("../middleware/authMiddleware");
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization operations
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Creates a new user account with a hashed password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 example: Doe
 *               age:
 *                 type: number
 *                 description: Age of the user
 *                 example: 25
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user
 *                 example: +4512345678
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: StrongPassword123!
 *               address:
 *                 type: string
 *                 description: User address
 *                 example: 123 Event Lane, Copenhagen
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Registration failed
 */
router.post("/register", authController.register); // Register endpoint

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     description: Authenticates a user with email and password and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: StrongPassword123!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Login failed
 */
router.post("/login", authController.login); // Login endpoint

/**
 * @swagger
 * /protected:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Protected route
 *     description: Returns a message for authenticated users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access to protected route
 *       401:
 *         description: Access denied
 */
router.get('/protected', authenticateToken, (req, res) => {
    res.send('You have access to this protected route!');
});

module.exports = router;