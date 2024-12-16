const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/uploadMiddleware');
const authenticateToken = require('../middleware/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and operations
 */

/**
 * @swagger
  * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by email
 *     description: Retrieve a user's details using their email address.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/users', userController.getUser);

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: This endpoint creates a new user and stores their details in the database.
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
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user account
 *                 example: SecureP@ssw0rd!
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User has been created
 *                 newUser:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /deleteuser:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user and their events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user to delete
 *                 example: example@example.com
 *     responses:
 *       200:
 *         description: User and their events deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User and their events have been deleted
 *       404:
 *         description: User not found
 */
router.delete('/deleteuser', userController.deleteUser);

/**
 * @swagger
 * /updateuser:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user's details and their related events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldEmail:
 *                 type: string
 *                 description: The current email of the user
 *                 example: old@example.com
 *               newEmail:
 *                 type: string
 *                 description: The new email to update the user with
 *                 example: new@example.com
 *               updateFields:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 description: Any additional fields to update (e.g., name, age)
 *     responses:
 *       200:
 *         description: User and related events updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User and related events have been updated
 *       404:
 *         description: User not found
 */

router.put('/updateuser', userController.updateUser);


router.post('/upload', authenticateToken, upload.single('profilePicture'), userController.uploadProfilePicture);


module.exports = router;