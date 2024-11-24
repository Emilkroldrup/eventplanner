const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register); // Register endpoint
router.post("/login", authController.login); // Login endpoint

module.exports = router;